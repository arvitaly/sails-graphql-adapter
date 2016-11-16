import { GraphQLSchema, GraphQLObjectType, GraphQLFieldConfigMap } from 'graphql';
import convertModel, { Model } from './../model';
import queriesForModel from './queries';
import mutationsForModel from './mutations';
import subscriptionsForModel from './subscriptions';
import Generator from './generator';
function generate(sails: Sails.Sails): GraphQLSchema {
    let models: { [index: string]: Model } = {};
    let generator: Generator = new Generator(sails),
        queryTypeFields: GraphQLFieldConfigMap<any> = {},
        mutationTypeFields: GraphQLFieldConfigMap<any> = {},
        subscriptionTypeFields: GraphQLFieldConfigMap<any> = {};
    generator.mapSailsModels((sailsModel) => {
        queriesForModel(sailsModel.identity, generator).map(({name, field}) => {
            queryTypeFields[name] = field;
        })
        /*mutationsForModel(models[modelName], generator).map(({name, field}) => {
            mutationTypeFields[name] = field;
        })
        subscriptionsForModel(models[modelName], generator).map(({name, field}) => {
            mutationTypeFields[name] = field;
        })*/
    })
    const queryType = new GraphQLObjectType({
        name: "Query",
        fields: queryTypeFields
    })
    /*const mutationType = new GraphQLObjectType({
        name: 'Mutation',
        fields: mutationTypeFields
    });
    const subscriptionType = new GraphQLObjectType({
        name: "Subscription",
        fields: subscriptionTypeFields
    })*/
    const schema = new GraphQLSchema({
        query: queryType/*,
        mutation: mutationType,
        subscription: subscriptionType*/
    });
    return schema;
}

export default generate;