import Generator from "./generator";
import mutationsForModel from "./mutations";
import queriesForModel from "./queries";
import { GraphQLFieldConfigMap, GraphQLObjectType, GraphQLSchema } from "graphql";
// import subscriptionsForModel from "./subscriptions";
function generate(sails: Sails.Sails): GraphQLSchema {
    let generator: Generator = new Generator(sails);
    let queryTypeFields: GraphQLFieldConfigMap<any> = {};
    let mutationTypeFields: GraphQLFieldConfigMap<any> = {};
    // let subscriptionTypeFields: GraphQLFieldConfigMap<any> = {};
    generator.mapSailsModels((sailsModel) => {
        queriesForModel(sailsModel.identity, generator).map(({name, field}) => {
            queryTypeFields[name] = field;
        });
        mutationsForModel(sailsModel.identity, generator).map(({name, field}) => {
            mutationTypeFields[name] = field;
        }); /*
        subscriptionsForModel(models[modelName], generator).map(({name, field}) => {
            mutationTypeFields[name] = field;
        })*/
    });
    const queryType = new GraphQLObjectType({
        fields: queryTypeFields,
        name: "Query",
    });
    const mutationType = new GraphQLObjectType({
        fields: mutationTypeFields,
        name: "Mutation",
    });
    /*const subscriptionType = new GraphQLObjectType({
        name: "Subscription",
        fields: subscriptionTypeFields
    })*/
    const schema = new GraphQLSchema({
        mutation: mutationType,
        query: queryType,
        /*
        subscription: subscriptionType*/
    });
    return schema;
}
export default generate;
