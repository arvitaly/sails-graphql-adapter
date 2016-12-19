"use strict";
const graphqlHTTP = require("express-graphql");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (opts) => {
    // tslint:disable:only-arrow-functions
    const index = function (req, res) {
        req.socket.on("close", () => {
            if (req.body && req.body.subscriptionId) {
                opts.resolver.unsubscribe(req.body.subscriptionId);
            }
        });
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
    const unsubscribe = function (req, res) {
        if (req.body && req.body.subscriptionId) {
            opts.resolver.unsubscribe(req.body.subscriptionId);
        }
    };
    return { index };
};
