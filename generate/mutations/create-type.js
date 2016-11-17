"use strict";
const attribute_type_1 = require("./../../model/attribute-type");
const capitalize_1 = require("./../../utils/capitalize");
const scalar_type_to_graphql_1 = require("./../../utils/scalar-type-to-graphql");
const graphql_1 = require("graphql");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (id, generator) => {
    const model = generator.getModel(id);
    let fields = {};
    model.attributes.map((attr) => {
        switch (attr.type) {
            case attribute_type_1.default.String:
            case attribute_type_1.default.Integer:
            case attribute_type_1.default.Float:
            case attribute_type_1.default.Boolean:
            case attribute_type_1.default.Date:
            case attribute_type_1.default.Datetime:
                const gType = scalar_type_to_graphql_1.default(attr.type);
                fields[attr.name] = { type: attr.isRequired ? new graphql_1.GraphQLNonNull(gType) : gType };
                break;
            case attribute_type_1.default.Model:
                fields[attr.name] = {
                    type: scalar_type_to_graphql_1.default(generator.getModel(attr.model).primary.type),
                };
                fields["create" + capitalize_1.default(attr.name)] = { type: generator.getCreateType(attr.model) };
                break;
            default:
                throw new Error("Unsupported attr type " + attribute_type_1.default[attr.type]);
        }
    });
    return new graphql_1.GraphQLInputObjectType({
        name: model.getNameWithPostfix("CreateWith"),
        fields,
    });
};
