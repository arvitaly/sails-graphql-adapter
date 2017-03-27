import * as graphqlHTTP from "express-graphql";
import { GraphQLSchema } from "graphql";
import { Resolver } from "graphql-models";
import Sails = require("sails");
export default (opts?: {
    schema: GraphQLSchema,
    resolver: Resolver,
}) => {
    // tslint:disable:only-arrow-functions
    // tslint:disable-next-line:space-before-function-paren
    const index = function (req: Sails.Request, res) {
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
    const unsubscribe = function (req: Sails.Request, res) {
        if (req.body && req.body.subscriptionId) {
            opts.resolver.unsubscribe(req.body.subscriptionId);
        }
    };
    return { index, unsubscribe };
};
