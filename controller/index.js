"use strict";
const graphqlHTTP = require('express-graphql');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (schema) => {
    return {
        index: function (req, res) {
            return graphqlHTTP({
                schema: schema ? schema : sails.schema,
                graphiql: true
            }).apply(this, arguments);
        }
    };
};
