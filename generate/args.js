"use strict";
const graphql_1 = require('graphql');
const attribute_type_1 = require('./../model/attribute-type');
function default_1(model) {
    let args = {};
    model.mapAttributes((attr) => {
        switch (attr.type) {
            case attribute_type_1.default.String:
                args[attr.name] = { type: graphql_1.GraphQLString };
                args[attr.name + "Contains"] = { type: graphql_1.GraphQLString };
                args[attr.name + "StartsWith"] = { type: graphql_1.GraphQLString };
                args[attr.name + "EndsWith"] = { type: graphql_1.GraphQLString };
                args[attr.name + "Like"] = { type: graphql_1.GraphQLString };
                args[attr.name + "In"] = { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)) };
                break;
            case attribute_type_1.default.Integer:
                args[attr.name + "In"] = { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)) };
                break;
        }
    });
    return args;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
