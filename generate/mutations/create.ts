import AttributeType from "./../../model/attribute-type";
import ResolveType from "./../../resolve/type";
import Generator from "./../generator";
import {
    GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLInputFieldConfigMap,
    GraphQLInt, GraphQLNonNull, GraphQLString
} from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
export default (id: string, generator: Generator): Array<{ name: string, field: GraphQLFieldConfig<any> }> => {
    const model = generator.getModel(id);
    let inputFields: GraphQLInputFieldConfigMap = {};
    model.mapAttributes((attr) => {
        switch (attr.type) {
            case AttributeType.String:
                inputFields[attr.name] = {
                    type: attr.isRequired ? new GraphQLNonNull(GraphQLString) : GraphQLString,
                };
                break;
            case AttributeType.Integer:
                inputFields[attr.name] = {
                    type: attr.isRequired ? new GraphQLNonNull(GraphQLInt) : GraphQLInt,
                };
                break;
            default:
                throw new Error("Unsupported attr type " + AttributeType[attr.type]);
        }
    });
    let outputFields: GraphQLFieldConfigMap<any> = {};
    outputFields[model.queryName] = {
        type: generator.getType(model.id)
    };
    return [{
        field: mutationWithClientMutationId({
            inputFields,
            mutateAndGetPayload: (mutateObject, info) => {
                return generator.resolver.resolve({
                    identity: model.id,
                    mutateObject,
                    parentIdentity: null,
                    type: ResolveType.MutateAndGetPayload,
                });
            },
            name: model.getNameWithPrefix("Create") + "Mutation",
            outputFields,
        }),
        name: model.getNameWithPrefix("create"),
    }];
};
