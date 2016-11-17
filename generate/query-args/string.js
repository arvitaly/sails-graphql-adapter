"use strict";
const graphql_1 = require("graphql");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (argName) => {
    let args = [];
    args.push({ field: { type: graphql_1.GraphQLString }, name: argName });
    args.push({ field: { type: graphql_1.GraphQLString }, name: argName + "Contains" });
    args.push({ field: { type: graphql_1.GraphQLString }, name: argName + "StartsWith" });
    args.push({ field: { type: graphql_1.GraphQLString }, name: argName + "EndsWith" });
    args.push({ field: { type: graphql_1.GraphQLString }, name: argName + "Like" });
    args.push({ field: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)) }, name: argName + "In" });
    return args;
};
