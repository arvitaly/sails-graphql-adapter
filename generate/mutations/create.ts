import AttributeType from "./../../model/attribute-type";
import ResolveType from "./../../resolve/type";
import capitalize from "./../../utils/capitalize";
import scalarTypeToGraphql from "./../../utils/scalar-type-to-graphql";
import Generator from "./../generator";
import { GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLInputFieldConfigMap, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
const create = (id: string, generator: Generator): Array<{ name: string, field: GraphQLFieldConfig<any> }> => {
    const model = generator.getModel(id);
    let inputFields: GraphQLInputFieldConfigMap = {};
    model.attributes.map((attr) => {
        switch (attr.type) {
            case AttributeType.String:
            case AttributeType.Integer:
            case AttributeType.Float:
            case AttributeType.Boolean:
            case AttributeType.Date:
            case AttributeType.Datetime:
                const gType = scalarTypeToGraphql(attr.type);
                inputFields[attr.name] = { type: attr.isRequired ? new GraphQLNonNull(gType) : gType };
                break;
            case AttributeType.Model:
                inputFields[attr.name] = {
                    type: scalarTypeToGraphql(generator.getModel(attr.model).primary.type),
                };
                inputFields["create" + capitalize(attr.name)] = {
                    type: generator.getCreateType(attr.model),
                };
                break;
            default:
                throw new Error("Unsupported attr type " + AttributeType[attr.type]);
        }
    });
    let outputFields: GraphQLFieldConfigMap<any> = {};
    outputFields[model.queryName] = {
        type: generator.getType(model.id),
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
export default create;
