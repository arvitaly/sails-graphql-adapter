import { GraphQLSchema } from 'graphql';
import * as graphqlHTTP from 'express-graphql';
export default (schema: GraphQLSchema) => {
    return {
        index: graphqlHTTP({
            schema: schema,
            graphiql: true
        })
    }
}
