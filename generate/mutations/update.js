"use strict";
const attribute_type_1 = require("./../../model/attribute-type");
const type_1 = require("./../../resolve/type");
const scalar_type_to_graphql_1 = require("./../../utils/scalar-type-to-graphql");
const args_1 = require("./../args");
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const create = (id, generator) => {
    const model = generator.getModel(id);
    let inputFields = {};
    let whereFields = {};
    model.attributes.map((attr) => {
        let gType;
        switch (attr.type) {
            case attribute_type_1.default.String:
            case attribute_type_1.default.Integer:
            case attribute_type_1.default.Float:
            case attribute_type_1.default.Boolean:
            case attribute_type_1.default.Date:
            case attribute_type_1.default.Datetime:
                gType = scalar_type_to_graphql_1.default(attr.type);
                break;
            case attribute_type_1.default.Model:
                gType = scalar_type_to_graphql_1.default(generator.getModel(attr.model).primary.type);
                break;
            default:
                throw new Error("Unsupported attr type " + attribute_type_1.default[attr.type]);
        }
        whereFields[attr.name] = { type: attr.isRequired ? new graphql_1.GraphQLNonNull(gType) : gType };
        let setFields = {};
        setFields[attr.name] = { type: attr.isRequired ? new graphql_1.GraphQLNonNull(gType) : gType };
        inputFields["set" + attr.capitalizeName] = {
            type: new graphql_1.GraphQLInputObjectType({
                fields: setFields,
                name: model.name + "UpdateMutationSet" + attr.capitalizeName,
            }),
        };
    });
    whereFields = args_1.default(id, generator);
    // tslint:disable:no-string-literal
    inputFields["where"] = {
        type: new graphql_1.GraphQLInputObjectType({
            fields: whereFields,
            name: model.name + "UpdateMutationWhere",
        }),
    };
    // tslint:enable:no-string-literal
    let outputFields = {};
    outputFields[model.pluralizeQueryName] = {
        type: new graphql_1.GraphQLList(generator.getType(model.id)),
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
                        type: type_1.default.MutateAndGetPayloadUpdate,
                    });
                },
                name: model.getNameWithPrefix("Update") + "Mutation",
                outputFields,
            }),
            name: model.getNameWithPrefix("update"),
        }];
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
