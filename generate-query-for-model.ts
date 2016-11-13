import { GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import generateArgsForModel from './generate-args-for-model';
export default function generateQueryForModel(name: string, model: Waterline.Model<any>, modelType: GraphQLObjectType): Array<{ name: string, field: GraphQLFieldConfig<any> }> {
    return [{
        name: name,
        field: {
            args: generateArgsForModel(model),
            description: name,
            deprecationReason: "",
            resolve: async (parent, args, context) => {
                return (await model.find({ limit: 1 }))[0];
            },
            type: modelType
        }
    }, {
        name: name + "s",
        field: {
            args: generateArgsForModel(model),
            description: name,
            deprecationReason: "",
            resolve: async (parent, args, context) => {
                return (await model.find({}));
            },
            type: new GraphQLList(modelType)
        }
    }]
}