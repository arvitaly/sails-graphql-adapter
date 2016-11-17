import ResolveType from "./../resolve/type";
import argsForModel from "./args";
import Generator from "./generator";
import { GraphQLFieldConfig } from "graphql";
import { connectionDefinitions } from "graphql-relay";
export type Queries = Array<{ name: string, field: GraphQLFieldConfig<any> }>;
export default function generateQueryForModel(id: string, generator: Generator): Queries {
    const model = generator.getModel(id);
    const modelType = generator.getType(model.id);
    const connectionParams = connectionDefinitions({ nodeType: modelType });
    return [{
        field: {
            args: argsForModel(id, generator),
            description: model.name,
            resolve: (root, args, context) => {
                return generator.resolver.resolve({
                    args,
                    attrName: null,
                    context,
                    identity: model.id,
                    parentIdentity: null,
                    root,
                    type: ResolveType.Model,
                });
            },
            type: modelType,
        },
        name: model.queryName,

    }, {
        field: {
            args: argsForModel(id, generator),
            description: "List of " + model.name,
            resolve: (root, args, context) => {
                return generator.resolver.resolve({
                    args,
                    attrName: null,
                    context,
                    identity: model.id,
                    parentIdentity: null,
                    root,
                    type: ResolveType.ListOfModel,
                });
            },
            type: connectionParams.connectionType,
        },
        name: model.pluralizeQueryName,
    }];
}
