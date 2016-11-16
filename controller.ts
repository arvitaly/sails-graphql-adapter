import { GraphQLSchema } from 'graphql';
import * as graphqlHTTP from 'express-graphql';
declare var sails: {
    schema: GraphQLSchema
}
export default (schema?: GraphQLSchema) => {
    return {
        index: function (req, res) {
            return graphqlHTTP({
                schema: schema ? schema : sails.schema,
                graphiql: true
            }).apply(this, arguments);
        }
    }
}