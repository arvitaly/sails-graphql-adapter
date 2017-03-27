"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlHTTP = require("express-graphql");
exports.default = (opts) => {
    // tslint:disable:only-arrow-functions
    // tslint:disable-next-line:space-before-function-paren
    const index = function (req, res) {
        req.socket.on("close", () => {
            if (req.body && req.body.subscriptionId) {
                opts.resolver.unsubscribe(req.body.subscriptionId);
            }
        });
        if (req.body && req.body.isBase64Transfer) {
            req.body.query = new Buffer(req.body.query, "base64").toString("utf8");
        }
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
    // tslint:disable-next-line:space-before-function-paren
    const unsubscribe = function (req, res) {
        if (req.body && req.body.subscriptionId) {
            opts.resolver.unsubscribe(req.body.subscriptionId);
        }
    };
    return { index, unsubscribe };
};
