import { GraphQLSchema, GraphQLObjectType, GraphQLFieldConfigMap } from 'graphql';
import convertModel, { Model } from './../model';
import queriesForModel from './queries';
import mutationsForModel from './mutations';
import subscriptionsForModel from './subscriptions';
import Generator from './generator';
function generate(sails: Sails.Sails): GraphQLSchema {
    let models: { [index: string]: Model } = {};
    const sailsModels = sailsModelsToArray(sails.models);
    sailsModels.map((sailsModel) => {
        models[sailsModel.identity] = convertModel(sailsModel);
    })
    let generator: Generator = new Generator(sails, models),
        queryTypeFields: GraphQLFieldConfigMap<any> = {},
        mutationTypeFields: GraphQLFieldConfigMap<any> = {},
        subscriptionTypeFields: GraphQLFieldConfigMap<any> = {};
    sailsModels.map((sailsModel) => {        
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
function sailsModelsToArray(sailsModels: { [index: string]: Sails.Model }): Array<Sails.Model> {
    let arr = [];
    for (let modelName in sailsModels) {
        arr.push(sailsModels[modelName])
    }
    return arr;
}
export default generate;