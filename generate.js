"use strict";
const graphql_1 = require('graphql');
const generate_type_for_model_1 = require('./generate-type-for-model');
const generate_query_for_model_1 = require('./generate-query-for-model');
const generate_mutations_for_model_1 = require('./generate-mutations-for-model');
function generate(models) {
    let queryTypeFields = {};
    let mutationTypeFields = {};
    for (let modelName in models) {
        let modelType = generate_type_for_model_1.default(modelName, models[modelName]);
        generate_query_for_model_1.default(modelName, models[modelName], modelType).map(({ name, field }) => {
            queryTypeFields[name] = field;
        });
        generate_mutations_for_model_1.default(modelName, models[modelName], modelType).map(({ name, field }) => {
            mutationTypeFields[name] = field;
        });
    }
    const queryType = new graphql_1.GraphQLObjectType({
        name: "Query",
        fields: queryTypeFields
    });
    var mutationType = new graphql_1.GraphQLObjectType({
        name: 'Mutation',
        fields: mutationTypeFields
    });
    const schema = new graphql_1.GraphQLSchema({
        query: queryType,
        mutation: mutationType
    });
    return schema;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
