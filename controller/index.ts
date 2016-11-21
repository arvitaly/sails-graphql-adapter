import generate from "./../generate";
import * as graphqlHTTP from "express-graphql";
import { GraphQLSchema } from "graphql";
export default (opts?: {
    schema?: GraphQLSchema,
    sails?: Sails.Sails
}) => {
    let schema: GraphQLSchema;
    opts = opts || {};

    // tslint:disable:only-arrow-functions
    const index = function (req, res) {
        if (!schema) {
            if (!opts.schema) {
                if (opts.sails) {
                    schema = generate(opts.sails);
                } else {
                    schema = generate(sails);
                }
            } else {
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
