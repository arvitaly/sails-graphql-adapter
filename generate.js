"use strict";
const graphql_1 = require('graphql');
const generate_query_for_model_1 = require('./generate-query-for-model');
function generate(models) {
    let queryTypeFields = {};
    for (let modelName in models) {
        generate_query_for_model_1.default(modelName, models[modelName]).map(({ name, field }) => {
            queryTypeFields[name] = field;
        });
    }
    const queryType = new graphql_1.GraphQLObjectType({
        name: "Query",
        fields: queryTypeFields
    });
    const schema = new graphql_1.GraphQLSchema({
        query: queryType
    });
    return schema;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
