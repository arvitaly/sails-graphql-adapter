"use strict";
const graphqlHTTP = require("express-graphql");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (opts) => {
    // tslint:disable:only-arrow-functions
    const index = function (req, res) {
        return graphqlHTTP({
            context: {
                request: req,
                response: res,
                subscriptionId: req.body ? req.body.subscriptionId : null,
            },
            graphiql: true,
            schema: opts.schema,
        }).apply(this, arguments);
    };
    return { index };
};
