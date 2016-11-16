"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const type_1 = require('./type');
const args_to_find_1 = require('./args-to-find');
class Resolver {
    constructor(sails, models) {
        this.sails = sails;
        this.models = models;
    }
    resolve(opts) {
        switch (opts.type) {
            case type_1.default.Model:
                return this.resolveModel(opts);
            case type_1.default.ListOfModel:
        }
    }
    resolveModel(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sails.models[opts.identity].findOne(args_to_find_1.default(this.models[opts.identity], opts.args));
        });
    }
    resolveListOfModel(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const findParams = args_to_find_1.default(this.models[opts.identity], opts.args);
            const result = yield sails.models[opts.identity].find(findParams);
            const connection = {
                edges: result.map((n) => {
                    return {
                        node: n,
                        cursor: ""
                    };
                }),
                pageInfo: {
                    hasNextPage: true,
                    hasPreviousPage: true,
                    startCursor: "sss",
                    endCursor: "ggg"
                }
            };
            return connection;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Resolver;
