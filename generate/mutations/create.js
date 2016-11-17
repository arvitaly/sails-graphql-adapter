"use strict";
const attribute_type_1 = require("./../../model/attribute-type");
const type_1 = require("./../../resolve/type");
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (id, generator) => {
    const model = generator.getModel(id);
    let inputFields = {};
    model.mapAttributes((attr) => {
        switch (attr.type) {
            case attribute_type_1.default.String:
                inputFields[attr.name] = {
                    type: attr.isRequired ? new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) : graphql_1.GraphQLString,
                };
                break;
            case attribute_type_1.default.Integer:
                inputFields[attr.name] = {
                    type: attr.isRequired ? new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) : graphql_1.GraphQLInt,
                };
                break;
            default:
                throw new Error("Unsupported attr type " + attribute_type_1.default[attr.type]);
        }
    });
    let outputFields = {};
    outputFields[model.queryName] = {
        type: generator.getType(model.id)
    };
    return [{
            field: graphql_relay_1.mutationWithClientMutationId({
                inputFields,
                mutateAndGetPayload: (mutateObject, info) => {
                    return generator.resolver.resolve({
                        identity: model.id,
                        mutateObject,
                        parentIdentity: null,
                        type: type_1.default.MutateAndGetPayload,
                    });
                },
                name: model.getNameWithPrefix("Create") + "Mutation",
                outputFields,
            }),
            name: model.getNameWithPrefix("create"),
        }];
};
