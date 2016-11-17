"use strict";
const graphql_1 = require("graphql");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (argName) => {
    let args = [];
    args.push({ field: { type: graphql_1.GraphQLInt }, name: argName });
    args.push({ field: { type: graphql_1.GraphQLInt }, name: argName + "LessThan" });
    args.push({ field: { type: graphql_1.GraphQLInt }, name: argName + "LessThanOrEqual" });
    args.push({ field: { type: graphql_1.GraphQLInt }, name: argName + "GreaterThan" });
    args.push({ field: { type: graphql_1.GraphQLInt }, name: argName + "GreaterThanOrEqual" });
    args.push({ field: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)) }, name: argName + "In" });
    return args;
};
