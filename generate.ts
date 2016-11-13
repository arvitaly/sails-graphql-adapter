import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFieldDefinition, GraphQLFieldDefinitionMap, GraphQLFieldConfigMap } from 'graphql';
import generateQueryForModel from './generate-query-for-model';

function generate(models: { [index: string]: Waterline.Model<any> }): GraphQLSchema {
    let queryTypeFields: GraphQLFieldConfigMap<any> = {};
    for (let modelName in models) {
        generateQueryForModel(modelName, models[modelName]).map(({name, field}) => {
            queryTypeFields[name] = field;
        })
    }

    const queryType = new GraphQLObjectType({
        name: "Query",
        fields: queryTypeFields
    })
    const schema = new GraphQLSchema({
        query: queryType
    });
    return schema;
}
export default generate;