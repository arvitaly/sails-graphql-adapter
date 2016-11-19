"use strict";
const generator_1 = require("./generator");
const mutations_1 = require("./mutations");
const queries_1 = require("./queries");
const graphql_1 = require("graphql");
// import subscriptionsForModel from "./subscriptions";
function generate(sails) {
    let generator = new generator_1.default(sails);
    let queryTypeFields = {};
    let mutationTypeFields = {};
    // let subscriptionTypeFields: GraphQLFieldConfigMap<any> = {};
    generator.mapSailsModels((sailsModel) => {
        queries_1.default(sailsModel.identity, generator).map(({ name, field }) => {
            queryTypeFields[name] = field;
        });
        mutations_1.default(sailsModel.identity, generator).map(({ name, field }) => {
            mutationTypeFields[name] = field;
        }); /*
        subscriptionsForModel(models[modelName], generator).map(({name, field}) => {
            mutationTypeFields[name] = field;
        })*/
    });
    const viewerType = new graphql_1.GraphQLObjectType({
        fields: queryTypeFields,
        name: "Viewer",
    });
    const queryType = new graphql_1.GraphQLObjectType({
        fields: {
            viewer: {
                resolve: () => {
                    return {};
                },
                type: viewerType
            },
        },
        name: "Query",
    });
    const mutationType = new graphql_1.GraphQLObjectType({
        fields: mutationTypeFields,
        name: "Mutation",
    });
    /*const subscriptionType = new GraphQLObjectType({
        name: "Subscription",
        fields: subscriptionTypeFields
    })*/
    const schema = new graphql_1.GraphQLSchema({
        mutation: mutationType,
        query: queryType,
    });
    return schema;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
