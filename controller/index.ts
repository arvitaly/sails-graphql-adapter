import generate from "./../generate";
import * as graphqlHTTP from "express-graphql";
import { GraphQLSchema } from "graphql";
export default (opts: {
    schema?: GraphQLSchema,
    sails?: Sails.Sails
}) => {
    let schema: GraphQLSchema;
    opts = opts || {};
    if (!opts.schema) {
        if (opts.sails) {
            schema = generate(opts.sails);
        } else {
            throw new Error("Should be setted schema or sails");
        }
    } else {
        schema = opts.schema;
    }
    // tslint:disable:only-arrow-functions
    const index = function(req, res) {
        return graphqlHTTP({
            graphiql: true,
            schema,
        }).apply(this, arguments);
    };
    return { index };
};
