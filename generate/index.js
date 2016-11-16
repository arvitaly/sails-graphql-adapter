"use strict";
const graphql_1 = require('graphql');
const queries_1 = require('./queries');
const generator_1 = require('./generator');
function generate(sails) {
    let models = {};
    let generator = new generator_1.default(sails), queryTypeFields = {}, mutationTypeFields = {}, subscriptionTypeFields = {};
    generator.mapSailsModels((sailsModel) => {
        queries_1.default(sailsModel.identity, generator).map(({ name, field }) => {
            queryTypeFields[name] = field;
        });
        /*mutationsForModel(models[modelName], generator).map(({name, field}) => {
            mutationTypeFields[name] = field;
        })
        subscriptionsForModel(models[modelName], generator).map(({name, field}) => {
            mutationTypeFields[name] = field;
        })*/
    });
    const queryType = new graphql_1.GraphQLObjectType({
        name: "Query",
        fields: queryTypeFields
    });
    /*const mutationType = new GraphQLObjectType({
        name: 'Mutation',
        fields: mutationTypeFields
    });
    const subscriptionType = new GraphQLObjectType({
        name: "Subscription",
        fields: subscriptionTypeFields
    })*/
    const schema = new graphql_1.GraphQLSchema({
        query: queryType /*,
        mutation: mutationType,
        subscription: subscriptionType*/
    });
    return schema;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
