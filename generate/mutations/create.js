"use strict";
const attribute_type_1 = require("./../../model/attribute-type");
const type_1 = require("./../../resolve/type");
const capitalize_1 = require("./../../utils/capitalize");
const scalar_type_to_graphql_1 = require("./../../utils/scalar-type-to-graphql");
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const create = (id, generator) => {
    const model = generator.getModel(id);
    let inputFields = {};
    model.attributes.map((attr) => {
        switch (attr.type) {
            case attribute_type_1.default.String:
            case attribute_type_1.default.Integer:
            case attribute_type_1.default.Float:
            case attribute_type_1.default.Boolean:
            case attribute_type_1.default.Date:
            case attribute_type_1.default.Datetime:
                const gType = scalar_type_to_graphql_1.default(attr.type);
                inputFields[attr.name] = { type: attr.isRequired ? new graphql_1.GraphQLNonNull(gType) : gType };
                break;
            case attribute_type_1.default.Model:
                inputFields[attr.name] = {
                    type: scalar_type_to_graphql_1.default(generator.getModel(attr.model).primary.type),
                };
                inputFields["create" + capitalize_1.default(attr.name)] = {
                    type: generator.getCreateType(attr.model),
                };
                break;
            default:
                throw new Error("Unsupported attr type " + attribute_type_1.default[attr.type]);
        }
    });
    let outputFields = {};
    outputFields[model.queryName] = {
        type: generator.getType(model.id),
    };
    return [{
            field: graphql_relay_1.mutationWithClientMutationId({
                inputFields,
                mutateAndGetPayload: (mutateObject, info) => {
                    return generator.resolver.resolve({
                        context: info,
                        identity: model.id,
                        mutateObject,
                        parentIdentity: null,
                        type: type_1.default.MutateAndGetPayloadCreate,
                    });
                },
                name: model.getNameWithPrefix("Create") + "Mutation",
                outputFields,
            }),
            name: model.getNameWithPrefix("create"),
        }];
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
