"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const graphql_1 = require('graphql');
const args_1 = require('./args');
function generateQueryForModel(model, generator) {
    const modelType = generator.getType(model.identity);
    return [{
            name: model.globalId,
            field: {
                args: args_1.default(model),
                description: model.globalId,
                resolve: (parent, args, context) => __awaiter(this, void 0, void 0, function* () {
                    return (yield model.find({ limit: 1 }))[0];
                }),
                type: modelType
            }
        }, {
            name: model.globalId + "s",
            field: {
                args: args_1.default(model),
                description: model.globalId,
                resolve: (parent, args, context) => __awaiter(this, void 0, void 0, function* () {
                    return (yield model.find({}));
                }),
                type: new graphql_1.GraphQLList(modelType)
            }
        }];
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateQueryForModel;
