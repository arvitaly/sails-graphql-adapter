import Generator from "./generator";
import queriesForModel from "./queries";
import { GraphQLFieldConfigMap, GraphQLObjectType, GraphQLSchema } from "graphql";
// import mutationsForModel from "./mutations";
// import subscriptionsForModel from "./subscriptions";
function generate(sails: Sails.Sails): GraphQLSchema {
    let generator: Generator = new Generator(sails);
    let queryTypeFields: GraphQLFieldConfigMap<any> = {};
    // let mutationTypeFields: GraphQLFieldConfigMap<any> = {};
    // let subscriptionTypeFields: GraphQLFieldConfigMap<any> = {};
    generator.mapSailsModels((sailsModel) => {
        queriesForModel(sailsModel.identity, generator).map(({name, field}) => {
            queryTypeFields[name] = field;
        });
        /*mutationsForModel(models[modelName], generator).map(({name, field}) => {
            mutationTypeFields[name] = field;
        })
        subscriptionsForModel(models[modelName], generator).map(({name, field}) => {
            mutationTypeFields[name] = field;
        })*/
    });
    const queryType = new GraphQLObjectType({
        fields: queryTypeFields,
        name: "Query",
    });
    /*const mutationType = new GraphQLObjectType({
        name: 'Mutation',
        fields: mutationTypeFields
    });
    const subscriptionType = new GraphQLObjectType({
        name: "Subscription",
        fields: subscriptionTypeFields
    })*/
    const schema = new GraphQLSchema({
        query: queryType, /*,
        mutation: mutationType,
        subscription: subscriptionType*/
    });
    return schema;
}
export default generate;
