"use strict";
const generate_1 = require("./../generate");
const graphqlHTTP = require("express-graphql");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (opts) => {
    let schema;
    opts = opts || {};
    // tslint:disable:only-arrow-functions
    const index = function (req, res) {
        if (!schema) {
            if (!opts.schema) {
                if (opts.sails) {
                    schema = generate_1.default(opts.sails);
                }
                else {
                    schema = generate_1.default(sails);
                }
            }
            else {
                schema = opts.schema;
            }
        }
        return graphqlHTTP({
            context: {
                request: req,
                response: res,
            },
            graphiql: true,
            schema
        }).apply(this, arguments);
    };
    return { index };
};
