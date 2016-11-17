"use strict";
const generate_1 = require("./../generate");
const graphqlHTTP = require("express-graphql");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (opts) => {
    let schema;
    opts = opts || {};
    if (!opts.schema) {
        if (opts.sails) {
            schema = generate_1.default(opts.sails);
        }
        else {
            throw new Error("Should be setted schema or sails");
        }
    }
    else {
        schema = opts.schema;
    }
    // tslint:disable:only-arrow-functions
    const index = function (req, res) {
        return graphqlHTTP({
            graphiql: true,
            schema,
        }).apply(this, arguments);
    };
    return { index };
};
