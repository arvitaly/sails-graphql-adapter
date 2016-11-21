"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const args_to_find_1 = require("./args-to-find");
const equal_row_to_find_params_1 = require("./equal-row-to-find-params");
const type_1 = require("./type");
const graphql_relay_1 = require("graphql-relay");
class Resolver {
    constructor(generator) {
        this.generator = generator;
        this.subscribers = {};
        for (let modelName in this.generator.sails.models) {
            this.subscribers[modelName] = [];
            let oldAfterCreate = this.generator.sails.models[modelName].afterCreate;
            this.generator.sails.models[modelName].afterCreate = (created, cb) => {
                this.subscribers[modelName].map((s) => __awaiter(this, void 0, void 0, function* () {
                    if (s.opts.context.request.socket.connected) {
                        if (equal_row_to_find_params_1.default(s.args, created, modelName, this.generator)) {
                            const row = yield this.resolveOne(s.opts);
                            console.log(s.opts.resolveInfo);
                            s.opts.context.request.socket.emit(modelName, {
                                data: row,
                                id: row._id,
                                verb: "created",
                            });
                        }
                    }
                }));
                if (oldAfterCreate) {
                    oldAfterCreate(created, cb);
                }
                else {
                    cb();
                }
            };
        }
        //afterUpdate
        //afterCreate
        //afterDestroy
    }
    resolve(opts) {
        switch (opts.type) {
            case type_1.default.Model:
                return this.resolveOne(opts);
            case type_1.default.Submodel:
                return this.resolveSubmodel(opts);
            case type_1.default.ListOfModel:
                return this.resolveConnection(opts);
            case type_1.default.MutateAndGetPayloadCreate:
                return this.mutateAndGetPayloadCreate(opts);
            case type_1.default.MutateAndGetPayloadUpdate:
                return this.mutateAndGetPayloadUpdate(opts);
            case type_1.default.SubscriptionOne:
                return this.subscribeOne(opts);
            default:
                throw new Error("Unknown resolve type: " + type_1.default[opts.type]);
        }
    }
    mutateAndGetPayloadUpdate(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.generator.getModel(opts.identity);
            let updated = {};
            const where = args_to_find_1.default(this.generator.getModel(opts.identity), opts.mutateObject.where || {});
            model.attributes.map((attr) => {
                if (typeof (opts.mutateObject["set" + attr.capitalizeName]) !== "undefined") {
                    updated[attr.name] = opts.mutateObject["set" + attr.capitalizeName][attr.name];
                }
            });
            const result = yield this.generator.sails.models[opts.identity].update(where, updated);
            let res = {};
            res[model.pluralizeQueryName] = result.map((r) => {
                this.generator.sails.models[model.id].publishUpdate(r.id, r);
                return this.convertRow(model, r);
            });
            return res;
        });
    }
    generateCreateParams(modelId, createParams) {
        const model = this.generator.getModel(modelId);
        let created = Object.assign({}, createParams);
        model.attributes.map((attr) => {
            if (typeof (createParams["create" + attr.capitalizeName]) !== "undefined") {
                created[attr.name] = this.generateCreateParams(attr.model, createParams["create" + attr.capitalizeName]);
                delete created["create" + attr.capitalizeName];
            }
        });
        return created;
    }
    mutateAndGetPayloadCreate(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.generator.getModel(opts.identity);
            let created = this.generateCreateParams(opts.identity, opts.mutateObject);
            const result = (yield this.generator.sails.models[opts.identity].create(created));
            let res = {};
            res[model.queryName] = this.convertRow(model, result);
            this.generator.sails.models[opts.identity].publishCreate(result);
            return res;
        });
    }
    resolveSubmodel(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.generator.getModel(opts.identity);
            let where = {};
            where[model.primary.name] = opts.root[opts.attrName];
            const result = (yield this.generator.sails.models[opts.identity].find(where));
            if (result) {
                return this.convertRow(model, result[0]);
            }
            return null;
        });
    }
    subscribeOne(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const rowInfo = yield this._resolveOne(opts);
            if (!rowInfo) {
                return null;
            }
            this.subscribers[opts.identity].push({ opts, ids: [rowInfo.row.id], args: rowInfo.args });
            console.log("OPTS", opts.identity, this.subscribers);
            //this.generator.sails.models[opts.identity].subscribe(opts.context.request, [row._id]);
            //this.generator.sails.models[opts.identity].watch(opts.context.request);
            return rowInfo.row;
        });
    }
    resolveOne(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._resolveOne(opts);
            if (!result) {
                return null;
            }
            return result.row;
        });
    }
    _resolveOne(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.generator.getModel(opts.identity);
            const args = args_to_find_1.default(model, opts.args);
            const result = (yield this.generator.sails.models[opts.identity].find(args));
            if (result) {
                return { row: this.convertRow(model, result[0]), args };
            }
            return null;
        });
    }
    convertRow(model, n) {
        n._id = n.id;
        n.id = graphql_relay_1.toGlobalId(model.name, n.id);
        return n;
    }
    resolveConnection(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.generator.getModel(opts.identity);
            const args = args_to_find_1.default(model, opts.args);
            const result = (yield this.generator.sails.models[opts.identity].find(args));
            const connection = {
                edges: result.map((n) => {
                    return {
                        cursor: "",
                        node: this.convertRow(model, n),
                    };
                }),
                // TODO 
                pageInfo: {
                    endCursor: "",
                    hasNextPage: true,
                    hasPreviousPage: true,
                    startCursor: "",
                },
            };
            return connection;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Resolver;
;
