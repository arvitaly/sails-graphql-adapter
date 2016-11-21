import ResolveType from "./../resolve/type";
import argsForModel from "./args";
import Generator from "./generator";
import { GraphQLFieldConfig } from "graphql";
export type Queries = Array<{ name: string, field: GraphQLFieldConfig<any> }>;
export default function generateQueryForModel(id: string, generator: Generator): Queries {
    const model = generator.getModel(id);
    const modelType = generator.getType(model.id);
    return [{
        field: {
            args: argsForModel(id, generator),
            resolve: (root, args, context, resolveInfo) => {
                return generator.resolver.resolve({
                    args,
                    attrName: null,
                    context,
                    identity: model.id,
                    parentIdentity: null,
                    resolveInfo,
                    root,
                    type: ResolveType.SubscriptionOne,
                });
            },
            type: modelType,
        },
        name: model.queryName,

    }, {
        field: {
            args: argsForModel(id, generator),
            resolve: (root, args, context) => {
                return generator.resolver.resolve({
                    args,
                    attrName: null,
                    context,
                    identity: model.id,
                    parentIdentity: null,
                    root,
                    type: ResolveType.SubscriptionConnection,
                });
            },
            type: generator.getConnectionType(model.id),
        },
        name: model.pluralizeQueryName,
    }];
}
