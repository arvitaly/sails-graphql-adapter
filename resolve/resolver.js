"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const args_to_find_1 = require("./args-to-find");
const type_1 = require("./type");
class Resolver {
    constructor(generator) {
        this.generator = generator;
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
            res[model.pluralizeQueryName] = result;
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
            res[model.queryName] = result;
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
                return result[0];
            }
            return null;
        });
    }
    resolveOne(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = args_to_find_1.default(this.generator.getModel(opts.identity), opts.args);
            const result = (yield this.generator.sails.models[opts.identity].find(args));
            if (result) {
                return result[0];
            }
            return null;
        });
    }
    resolveConnection(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = args_to_find_1.default(this.generator.getModel(opts.identity), opts.args);
            const result = (yield this.generator.sails.models[opts.identity].find(args));
            const connection = {
                edges: result.map((n) => {
                    return {
                        cursor: "",
                        node: n,
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
