import AttributeType from "./../../model/attribute-type";
import capitalize from "./../../utils/capitalize";
import scalarTypeToGraphql from "./../../utils/scalar-type-to-graphql";
import Generator from "./../generator";
import { GraphQLInputFieldConfigMap, GraphQLInputObjectType, GraphQLNonNull } from "graphql";
export default (id: string, generator: Generator): GraphQLInputObjectType => {
    const model = generator.getModel(id);
    let fields: GraphQLInputFieldConfigMap = {};
    model.attributes.map((attr) => {
        switch (attr.type) {
            case AttributeType.String:
            case AttributeType.Integer:
            case AttributeType.Float:
            case AttributeType.Boolean:
            case AttributeType.Date:
            case AttributeType.Datetime:
                const gType = scalarTypeToGraphql(attr.type);
                fields[attr.name] = { type: attr.isRequired ? new GraphQLNonNull(gType) : gType };
                break;
            case AttributeType.Model:
                fields[attr.name] = {
                    type: scalarTypeToGraphql(generator.getModel(attr.model).primary.type),
                };
                fields["create" + capitalize(attr.name)] = { type: generator.getCreateType(attr.model) };
                break;
            default:
                throw new Error("Unsupported attr type " + AttributeType[attr.type]);
        }
    });
    return new GraphQLInputObjectType({
        name: model.getNameWithPostfix("CreateWith"),
        fields,
    });
};
