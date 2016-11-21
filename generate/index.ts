import Generator from "./generator";
import mutationsForModel from "./mutations";
import queriesForModel from "./queries";
import subscriptionsForModel from "./subscriptions";
import { GraphQLFieldConfigMap, GraphQLObjectType, GraphQLSchema } from "graphql";
function generate(sails: Sails.Sails): GraphQLSchema {
    let generator: Generator = new Generator(sails);
    let queryTypeFields: GraphQLFieldConfigMap<any> = {};
    let mutationTypeFields: GraphQLFieldConfigMap<any> = {};
    let subscriptionTypeFields: GraphQLFieldConfigMap<any> = {};
    generator.mapSailsModels((sailsModel) => {
        queriesForModel(sailsModel.identity, generator).map(({name, field}) => {
            queryTypeFields[name] = field;
        });
        mutationsForModel(sailsModel.identity, generator).map(({name, field}) => {
            mutationTypeFields[name] = field;
        });
        subscriptionsForModel(sailsModel.identity, generator).map(({name, field}) => {
            subscriptionTypeFields[name] = field;
        })
    });
    const viewerType = new GraphQLObjectType({
        fields: queryTypeFields,
        name: "Viewer",
    });
    const queryType = new GraphQLObjectType({
        fields: {
            viewer: {
                resolve: () => {
                    return {};
                },
                type: viewerType,
            },
        },
        name: "Query",
    });
    const mutationType = new GraphQLObjectType({
        fields: mutationTypeFields,
        name: "Mutation",
    });
    const subscriptionViewerType = new GraphQLObjectType({
        fields: subscriptionTypeFields,
        name: "SubscriptionViewer",
    });
    const subscriptionType = new GraphQLObjectType({
        fields: {
            viewer: {
                resolve: () => {
                    return {};
                },
                type: subscriptionViewerType,
            },
        },
        name: "Subscription",
    });
    const schema = new GraphQLSchema({
        mutation: mutationType,
        query: queryType,
        subscription: subscriptionType
    });
    return schema;
}
export default generate;
