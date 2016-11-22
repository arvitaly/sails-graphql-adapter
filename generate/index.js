"use strict";
const generator_1 = require("./generator");
const mutations_1 = require("./mutations");
const queries_1 = require("./queries");
const subscriptions_1 = require("./subscriptions");
const graphql_1 = require("graphql");
function generate(sailsModels) {
    let generator = new generator_1.default(sailsModels);
    let queryTypeFields = {};
    let mutationTypeFields = {};
    let subscriptionTypeFields = {};
    generator.mapSailsModels((sailsModel) => {
        queries_1.default(sailsModel.identity, generator).map(({ name, field }) => {
            queryTypeFields[name] = field;
        });
        mutations_1.default(sailsModel.identity, generator).map(({ name, field }) => {
            mutationTypeFields[name] = field;
        });
        subscriptions_1.default(sailsModel.identity, generator).map(({ name, field }) => {
            subscriptionTypeFields[name] = field;
        });
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
                type: viewerType,
            },
        },
        name: "Query",
    });
    const mutationType = new graphql_1.GraphQLObjectType({
        fields: mutationTypeFields,
        name: "Mutation",
    });
    const subscriptionViewerType = new graphql_1.GraphQLObjectType({
        fields: subscriptionTypeFields,
        name: "SubscriptionViewer",
    });
    const subscriptionType = new graphql_1.GraphQLObjectType({
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
    const schema = new graphql_1.GraphQLSchema({
        mutation: mutationType,
        query: queryType,
        subscription: subscriptionType
    });
    return {
        bindResolve: (resolve) => {
            generator.resolver.resolve = resolve;
        },
        schema,
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
