"use strict";
const graphqlHTTP = require('express-graphql');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    index: function () {
        return graphqlHTTP({
            schema: sails['graphql'],
            graphiql: true
        }).apply(this, arguments);
    }
};
