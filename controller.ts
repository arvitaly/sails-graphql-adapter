import * as graphqlHTTP from "express-graphql";
import { GraphQLSchema } from "graphql";
export default (opts?: {
    schema: GraphQLSchema,
}) => {
    // tslint:disable:only-arrow-functions
    const index = function (req, res) {
        return graphqlHTTP({
            context: {
                request: req,
                response: res,
            },
            graphiql: true,
            schema: opts.schema,
        }).apply(this, arguments);
    };
    return { index };
};
