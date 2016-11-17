"use strict";
const attribute_type_1 = require("./../model/attribute-type");
const graphql_1 = require("graphql");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (type) => {
    switch (type) {
        case attribute_type_1.default.String:
            return graphql_1.GraphQLString;
        case attribute_type_1.default.Integer:
            return graphql_1.GraphQLInt;
        case attribute_type_1.default.Float:
            return graphql_1.GraphQLFloat;
        case attribute_type_1.default.Date:
            return graphql_1.GraphQLString;
        case attribute_type_1.default.Datetime:
            return graphql_1.GraphQLString;
        case attribute_type_1.default.Boolean:
            return graphql_1.GraphQLBoolean;
        default:
            throw new Error("Unknown scalar type " + attribute_type_1.default[type]);
    }
};
