"use strict";
const type_1 = require("./../resolve/type");
const args_1 = require("./args");
const graphql_1 = require("graphql");
function generateQueryForModel(id, generator) {
    const model = generator.getModel(id);
    const modelType = generator.getType(model.id);
    return [{
            field: {
                args: args_1.default(id, generator),
                description: model.name,
                resolve: (root, args, context) => {
                    return generator.resolver.resolve({
                        args,
                        attrName: null,
                        context,
                        identity: model.id,
                        parentIdentity: null,
                        root,
                        type: type_1.default.Model,
                    });
                },
                type: modelType,
            },
            name: model.queryName,
        }, {
            field: {
                args: args_1.default(id, generator),
                description: "List of " + model.name,
                resolve: (root, args, context) => {
                    return generator.resolver.resolve({
                        args,
                        attrName: null,
                        context,
                        identity: model.id,
                        parentIdentity: null,
                        root,
                        type: type_1.default.ListOfModel,
                    });
                },
                type: new graphql_1.GraphQLList(modelType),
            },
            name: model.pluralizeQueryName,
        }];
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateQueryForModel;
