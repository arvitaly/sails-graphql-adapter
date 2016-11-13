"use strict";
const graphqlHTTP = require('express-graphql');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (schema) => {
    return {
        index: graphqlHTTP({
            schema: schema,
            graphiql: true
        })
    };
};
