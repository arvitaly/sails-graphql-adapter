import { GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import Generator from './generator';
import argsForModel from './args';
export default function generateQueryForModel(model: Sails.Model, generator: Generator): Array<{ name: string, field: GraphQLFieldConfig<any> }> {
    const modelType = generator.getType(model.identity);
    return [{
        name: model.globalId,
        field: {
            args: argsForModel(model),
            description: model.globalId,
            resolve: async (parent, args, context) => {
                return (await model.find({ limit: 1 }))[0];
            },
            type: modelType
        }
    }, {
        name: model.globalId + "s",
        field: {
            args: argsForModel(model),
            description: model.globalId,
            resolve: async (parent, args, context) => {
                return (await model.find({}));
            },
            type: new GraphQLList(modelType)
        }
    }]
}