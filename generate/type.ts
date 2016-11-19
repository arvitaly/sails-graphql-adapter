import AttributeType from "./../model/attribute-type";
import ResolveType from "./../resolve/type";
import scalarTypeToGraphql from "./../utils/scalar-type-to-graphql";
import Generator from "./generator";
import { GraphQLFieldConfigMap, GraphQLObjectType, GraphQLString } from "graphql";
export default (id: string, generator: Generator) => {
    const model = generator.getModel(id);
    let fields: GraphQLFieldConfigMap<any> = {};
    model.attributes.map((attr) => {
        if (attr.type === AttributeType.Model) {
            fields[attr.name] = {
                resolve: async (root, args, context) => {
                    return generator.resolver.resolve({
                        args,
                        attrName: attr.name,
                        context,
                        identity: attr.model,
                        parentIdentity: model.id,
                        root,
                        type: ResolveType.Submodel,
                    });
                },
                type: generator.getType(attr.model),
            };
        } else if (attr.name.toLowerCase() === "id") {
            fields[attr.name] = {
                type: GraphQLString,
            };
        } else {
            let graphqlType;
            switch (attr.type) {
                case AttributeType.String:
                case AttributeType.Integer:
                case AttributeType.Float:
                case AttributeType.Date:
                case AttributeType.Datetime:
                case AttributeType.Boolean:
                    graphqlType = scalarTypeToGraphql(attr.type);
                    break;
                default:
                    throw new Error("Not supported type " + AttributeType[attr.type]);
            }
            fields[attr.name] = {
                type: graphqlType,
            };
        }
    });
    return new GraphQLObjectType({
        description: model.name,
        fields,
        interfaces: [],
        name: model.name,
    });
};
