import { GraphQLSchema } from 'graphql';
import * as graphqlHTTP from 'express-graphql';
declare var sails: {
    schema: GraphQLSchema
}
export default {
    index: function () {
        return graphqlHTTP({
            schema: sails.schema,
            graphiql: true
        }).apply(this, arguments);
    }
}