import * as graphqlHTTP from 'express-graphql';
export default {
    index: function () {
        return graphqlHTTP({
            schema: sails['schema'],
            graphiql: true
        }).apply(this, arguments);
    }
}
