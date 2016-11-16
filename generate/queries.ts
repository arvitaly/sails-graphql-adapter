import { GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import ResolveType from './../resolve/type';
import Generator from './generator';
import { Model } from './../model';
import argsForModel from './args';
export default function generateQueryForModel(id: string, generator: Generator): Array<{ name: string, field: GraphQLFieldConfig<any> }> {
    const model = generator.getModel(id);    
    const modelType = generator.getType(model.id);
    return [{
        name: model.name,
        field: {
            args: argsForModel(model),
            description: model.name,
            resolve: (parent, args, context) => {
                return generator.resolver.resolve({
                    type: ResolveType.Model,
                    identity: model.id,
                    parentIdentity: null,
                    attrName: null,
                    root: parent,
                    args: args,
                    context: context
                });
            },
            type: modelType
        }
    }, {
        name: model.pluralizeQueryName,
        field: {
            args: argsForModel(model),
            description: "List of " + model.name,
            resolve: (parent, args, context) => {
                return generator.resolver.resolve({
                    type: ResolveType.ListOfModel,
                    identity: model.id,
                    parentIdentity: null,
                    attrName: null,
                    root: parent,
                    args: args,
                    context: context
                });
            },
            type: new GraphQLList(modelType)
        }
    }]
}