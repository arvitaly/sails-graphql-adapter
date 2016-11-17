import AttributeType from "./../../model/attribute-type";
import ResolveType from "./../../resolve/type";
import scalarTypeToGraphql from "./../../utils/scalar-type-to-graphql";
import argsForQuery from "./../args";
import Generator from "./../generator";
import {
    GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLInputFieldConfigMap,
    GraphQLInputObjectType, GraphQLList, GraphQLNonNull,
} from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
const create = (id: string, generator: Generator): Array<{ name: string, field: GraphQLFieldConfig<any> }> => {
    const model = generator.getModel(id);
    let inputFields: GraphQLInputFieldConfigMap = {};
    let whereFields: GraphQLInputFieldConfigMap = {};
    model.attributes.map((attr) => {
        let gType;
        switch (attr.type) {
            case AttributeType.String:
            case AttributeType.Integer:
            case AttributeType.Float:
            case AttributeType.Boolean:
            case AttributeType.Date:
            case AttributeType.Datetime:
                gType = scalarTypeToGraphql(attr.type);
                break;
            case AttributeType.Model:
                gType = scalarTypeToGraphql(generator.getModel(attr.model).primary.type);
                break;
            default:
                throw new Error("Unsupported attr type " + AttributeType[attr.type]);
        }
        whereFields[attr.name] = { type: attr.isRequired ? new GraphQLNonNull(gType) : gType };
        let setFields = {};
        setFields[attr.name] = { type: attr.isRequired ? new GraphQLNonNull(gType) : gType };
        inputFields["set" + attr.capitalizeName] = {
            type: new GraphQLInputObjectType({
                fields: setFields,
                name: model.name + "UpdateMutationSet" + attr.capitalizeName,
            }),
        };
    });
    whereFields = argsForQuery(id, generator);
    // tslint:disable:no-string-literal
    inputFields["where"] = {
        type: new GraphQLInputObjectType({
            fields: whereFields,
            name: model.name + "UpdateMutationWhere",
        }),
    };
    // tslint:enable:no-string-literal
    let outputFields: GraphQLFieldConfigMap<any> = {};
    outputFields[model.pluralizeQueryName] = {
        type: new GraphQLList(generator.getType(model.id)),
    };
    return [{
        field: mutationWithClientMutationId({
            inputFields,
            mutateAndGetPayload: (mutateObject, info) => {
                return generator.resolver.resolve({
                    identity: model.id,
                    mutateObject,
                    parentIdentity: null,
                    type: ResolveType.MutateAndGetPayloadUpdate,
                });
            },
            name: model.getNameWithPrefix("Update") + "Mutation",
            outputFields,
        }),
        name: model.getNameWithPrefix("update"),
    }];
};
export default create;
