import * as graphqlHTTP from "express-graphql";
import { GraphQLSchema } from "graphql";
import { Resolver } from "graphql-models";
import Sails = require("sails");
export default (opts?: {
    schema: GraphQLSchema,
    resolver: Resolver,
}) => {
    // tslint:disable:only-arrow-functions
    const index = function (req: Sails.Request, res) {
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
    const unsubscribe = function (req: Sails.Request, res) {
        if (req.body && req.body.subscriptionId) {
            opts.resolver.unsubscribe(req.body.subscriptionId);
        }
    };
    return { index };
};
