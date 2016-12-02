"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const graphql_models_1 = require("graphql-models");
class Resolver {
    constructor(models, sails, callbacks) {
        this.models = models;
        this.sails = sails;
        this.callbacks = callbacks;
    }
    resolve(opts) {
        switch (opts.type) {
            case graphql_models_1.ResolveTypes.QueryOne:
                return this.resolveQueryOne(opts);
            default:
                throw new Error("Unsupported resolve types");
        }
    }
    resolveQueryOne(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.models.get(opts.model);
            const primaryAttrName = model.getPrimaryKeyAttribute().name;
            // opts.context.request
            const result = yield this.sails.models[opts.model].findOne(opts.args[primaryAttrName]);
            const request = opts.context.request;
            const subscriptionId = request && request.headers ? request.headers["X-Subscription-Id"] : null;
            if (subscriptionId) {
                this.callbacks.on("update", (updated) => {
                    if (updated[primaryAttrName] === opts.args[primaryAttrName]) {
                        request.socket.emit("subscription-" + subscriptionId, updated);
                    }
                });
            }
            return result;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Resolver;
