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
const type_1 = require("./type");
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
                break;
            case type_1.default.MutateAndGetPayload:
                return this.mutateAndGetPayload(opts);
            default:
                throw new Error("Unknown resolve type");
        }
    }
    mutateAndGetPayload(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO 
        });
    }
    resolveModel(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield sails.models[opts.identity].find(args_to_find_1.default(this.models[opts.identity], opts.args)));
            if (result) {
                return result[0];
            }
            return null;
        });
    }
    resolveListOfModel(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented");
            /*const findParams = argsToFind(this.models[opts.identity], opts.args);
            const result = await sails.models[opts.identity].find(findParams);
            const connection: Connection<any> = {
                edges: result.map((n) => {
                    return {
                        cursor: "",
                        node: n,
                    };
                }),
                pageInfo: {
                    endCursor: "ggg",
                    hasNextPage: true,
                    hasPreviousPage: true,
                    startCursor: "sss",
                },
            };
            return connection;*/
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Resolver;
;
