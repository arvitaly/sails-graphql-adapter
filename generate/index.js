"use strict";
const graphql_1 = require('graphql');
const queries_1 = require('./queries');
const mutations_1 = require('./mutations');
const subscriptions_1 = require('./subscriptions');
const generator_1 = require('./generator');
function generate(models) {
    let generator = new generator_1.default(models), queryTypeFields = {}, mutationTypeFields = {}, subscriptionTypeFields = {};
    for (let modelName in models) {
        queries_1.default(models[modelName], generator).map(({ name, field }) => {
            queryTypeFields[name] = field;
        });
        mutations_1.default(models[modelName], generator).map(({ name, field }) => {
            mutationTypeFields[name] = field;
        });
        subscriptions_1.default(models[modelName], generator).map(({ name, field }) => {
            mutationTypeFields[name] = field;
        });
    }
    const queryType = new graphql_1.GraphQLObjectType({
        name: "Query",
        fields: queryTypeFields
    });
    const mutationType = new graphql_1.GraphQLObjectType({
        name: 'Mutation',
        fields: mutationTypeFields
    });
    const subscriptionType = new graphql_1.GraphQLObjectType({
        name: "Subscription",
        fields: subscriptionTypeFields
    });
    const schema = new graphql_1.GraphQLSchema({
        query: queryType,
        mutation: mutationType,
        subscription: subscriptionType
    });
    return schema;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
