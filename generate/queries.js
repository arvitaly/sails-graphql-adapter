"use strict";
const graphql_1 = require('graphql');
const type_1 = require('./../resolve/type');
const args_1 = require('./args');
function generateQueryForModel(id, generator) {
    const model = generator.getModel(id);
    const modelType = generator.getType(model.id);
    return [{
            name: model.name,
            field: {
                args: args_1.default(model),
                description: model.name,
                resolve: (parent, args, context) => {
                    return generator.resolver.resolve({
                        type: type_1.default.Model,
                        identity: model.id,
                        parentIdentity: null,
                        attrName: null,
                        root: parent,
                        args: args,
                        context: context
                    });
                },
                type: modelType
            }
        }, {
            name: model.pluralizeQueryName,
            field: {
                args: args_1.default(model),
                description: "List of " + model.name,
                resolve: (parent, args, context) => {
                    return generator.resolver.resolve({
                        type: type_1.default.ListOfModel,
                        identity: model.id,
                        parentIdentity: null,
                        attrName: null,
                        root: parent,
                        args: args,
                        context: context
                    });
                },
                type: new graphql_1.GraphQLList(modelType)
            }
        }];
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateQueryForModel;
