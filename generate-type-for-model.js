"use strict";
const graphql_1 = require('graphql');
const capitalize_1 = require('./capitalize');
const map_model_attributes_1 = require('./map-model-attributes');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (name, model) => {
    let fields = {};
    map_model_attributes_1.default(model._attributes).map(({ name, type, graphqlType }) => {
        fields[name] = {
            args: {},
            type: graphqlType,
            deprecationReason: "",
            description: name
        };
    });
    return new graphql_1.GraphQLObjectType({
        name: capitalize_1.default(name),
        description: name,
        fields: fields,
        interfaces: []
    });
};
