"use strict";
const graphql_1 = require("graphql");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (argName) => {
    let args = [];
    args.push({ field: { type: graphql_1.GraphQLBoolean }, name: argName });
    return args;
};
