"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const equal_row_to_find_params_1 = require("./equal-row-to-find-params");
const ResolveType_1 = require("./ResolveType");
const mutateAndGetPayloadUpdate_1 = require("./mutateAndGetPayloadUpdate");
class Resolver {
    constructor(models, sailsModels) {
        this.models = models;
        this.sailsModels = sailsModels;
        this.subscribers = {};
        for (let modelName in sailsModels) {
            this.subscribers[modelName] = [];
            let oldAfterCreate = sailsModels[modelName].afterCreate;
            sailsModels[modelName].afterCreate = (created, cb) => {
                this.subscribers[modelName].map((s) => __awaiter(this, void 0, void 0, function* () {
                    if (s.opts.context.request.socket.connected) {
                        if (equal_row_to_find_params_1.default(s.args, created, modelName, models)) {
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
            case ResolveType_1.default.Model:
                return resolveOne(opts);
            case ResolveType_1.default.Submodel:
                return resolveSubmodel(opts);
            case ResolveType_1.default.ListOfModel:
                return resolveConnection(opts);
            case ResolveType_1.default.MutateAndGetPayloadCreate:
                return mutateAndGetPayloadCreate(opts);
            case ResolveType_1.default.MutateAndGetPayloadUpdate:
                return mutateAndGetPayloadUpdate_1.default(opts, this.models, this.sailsModels);
            case ResolveType_1.default.SubscriptionOne:
                return subscribeOne(opts);
            default:
                throw new Error("Unknown resolve type: " + ResolveType_1.default[opts.type]);
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Resolver;
;
