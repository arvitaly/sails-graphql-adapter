"use strict";
const graphql_1 = require('graphql');
const model_1 = require('./../model');
const queries_1 = require('./queries');
const generator_1 = require('./generator');
function generate(sails) {
    let models = {};
    const sailsModels = sailsModelsToArray(sails.models);
    sailsModels.map((sailsModel) => {
        models[sailsModel.identity] = model_1.default(sailsModel);
    });
    let generator = new generator_1.default(sails, models), queryTypeFields = {}, mutationTypeFields = {}, subscriptionTypeFields = {};
    sailsModels.map((sailsModel) => {
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
function sailsModelsToArray(sailsModels) {
    let arr = [];
    for (let modelName in sailsModels) {
        arr.push(sailsModels[modelName]);
    }
    return arr;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
