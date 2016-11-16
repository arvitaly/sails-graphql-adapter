import { GraphQLFieldConfigMap, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLUnionType } from 'graphql';
import Generator from './generator';
import ResolveType from './../resolve/type';
import { Model } from './../model';
import AttributeType from './../model/attribute-type';
export default (id: string, generator: Generator) => {
    const model = generator.getModel(id);
    let fields: GraphQLFieldConfigMap<any> = {};
    model.mapAttributes((attr) => {
        if (attr.type === AttributeType.Model) {
            fields[attr.name] = {
                type: generator.getType(attr.model),
                resolve: async (parent, args, context) => {
                    return generator.resolver.resolve({
                        attrName: attr.name,
                        type: ResolveType.Submodel,
                        identity: attr.model,
                        parentIdentity: model.id,
                        root: parent,
                        args: args,
                        context: context
                    })
                }
            }
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
                type: graphqlType
            }
        }
    })
    return new GraphQLObjectType({
        name: model.name,
        description: model.name,
        fields: fields,
        interfaces: []
    })
}