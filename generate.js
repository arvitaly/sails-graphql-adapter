"use strict";
const graphql_1 = require('graphql');
function generate(models) {
    const nodeType = new graphql_1.GraphQLObjectType({
        name: 'NodeType',
        fields: {}
    });
    let queries = {};
    let queriesArgs = {};
    for (let modelName in models) {
        let fields = {};
        queries[modelName] = new graphql_1.GraphQLObjectType({
            name: modelName,
            description: modelName,
            fields: fields /*,
            interfaces: [nodeType]*/
        });
        queriesArgs[modelName] = {};
        for (let attrName in models[modelName]._attributes) {
            fields[attrName] = new graphql_1.GraphQLObjectType({
                name: attrName,
                description: attrName,
                fields: {}
            });
        }
    }
    const queryType = new graphql_1.GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: graphql_1.GraphQLString,
                resolve() {
                    return 'world';
                }
            }
        }
    });
    const schema = new graphql_1.GraphQLSchema({
        query: queryType
    });
    return schema;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
