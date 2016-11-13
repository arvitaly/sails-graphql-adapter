import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFieldDefinition, GraphQLFieldDefinitionMap, GraphQLFieldConfigMap } from 'graphql';

import generateQueryForModel from './generate-query-for-model';
import generateMutationsForModel from './generate-mutations-for-model';
import Generator from './generator';

function generate(models: { [index: string]: Waterline.Model<any> }): GraphQLSchema {
    let generator: Generator = new Generator(models);
    let queryTypeFields: GraphQLFieldConfigMap<any> = {};
    let mutationTypeFields: GraphQLFieldConfigMap<any> = {};
    for (let modelName in models) {

        generateQueryForModel(modelName, models[modelName], generator).map(({name, field}) => {
            queryTypeFields[name] = field;
        })
        generateMutationsForModel(modelName, models[modelName], generator).map(({name, field}) => {
            mutationTypeFields[name] = field;
        })
    }

    const queryType = new GraphQLObjectType({
        name: "Query",
        fields: queryTypeFields
    })
    var mutationType = new GraphQLObjectType({
        name: 'Mutation',
        fields: mutationTypeFields
    });
    const schema = new GraphQLSchema({
        query: queryType,
        mutation: mutationType
    });
    return schema;
}
export default generate;