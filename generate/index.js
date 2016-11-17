"use strict";
const generator_1 = require("./generator");
const queries_1 = require("./queries");
const graphql_1 = require("graphql");
// import mutationsForModel from "./mutations";
// import subscriptionsForModel from "./subscriptions";
function generate(sails) {
    let generator = new generator_1.default(sails);
    let queryTypeFields = {};
    // let mutationTypeFields: GraphQLFieldConfigMap<any> = {};
    // let subscriptionTypeFields: GraphQLFieldConfigMap<any> = {};
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
    const schema = new graphql_1.GraphQLSchema({
        query: queryType,
    });
    return schema;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
