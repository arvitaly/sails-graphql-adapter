import AttributeType from "./../model/attribute-type";
import ResolveType from "./../resolve/type";
import Generator from "./generator";
import {
    GraphQLFieldConfigMap, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLString,
} from "graphql";
export default (id: string, generator: Generator) => {
    const model = generator.getModel(id);
    let fields: GraphQLFieldConfigMap<any> = {};
    model.mapAttributes((attr) => {
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
        } else {
            let graphqlType;
            switch (attr.type) {
                case AttributeType.String:
                    graphqlType = GraphQLString;
                    break;
                case AttributeType.Integer:
                    graphqlType = GraphQLInt;
                    break;
                case AttributeType.Float:
                    graphqlType = GraphQLFloat;
                    break;
                case AttributeType.Date:
                    graphqlType = GraphQLString;
                    break;
                case AttributeType.Datetime:
                    graphqlType = GraphQLString;
                    break;
                default:
                    throw new Error("Not supported type " + attr.type);
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
