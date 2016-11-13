import { GraphQLString, GraphQLInt, GraphQLScalarType } from 'graphql';
import AttributeType from './attribute-type';
export interface IAttrInfo { name: string, type: AttributeType, graphqlType: GraphQLScalarType, attribute: Waterline.Attribute }
export default (attributes: Waterline.Attributes): Array<IAttrInfo> => {
    let targetAttrs: Array<IAttrInfo> = [];
    for (let attrName in attributes) {
        let attr = attributes[attrName];
        let type: string = "";
        if (typeof (attr) === "string") {
            type = attr;
        } else {
            type = (attr as Waterline.BaseAttribute).type;
        }
        let graphQLType, outType: AttributeType;

        switch (("" + type).toLowerCase()) {
            case "string":
                graphQLType = GraphQLString;
                outType = AttributeType.String;
                break;
            case "integer" || "int":
                graphQLType = GraphQLInt;
                outType = AttributeType.Integer;
                break;
            case "datetime":
                outType = AttributeType.Datetime;
                graphQLType = GraphQLString;
                break;
            default:
                graphQLType = null;
        }
        if (attr['model']) {
            outType = AttributeType.Model;
        }
        if (attr['collection']) {
            outType = AttributeType.Model;
        }
        if (!outType) {
            outType = AttributeType.String
        }
        targetAttrs.push({ name: attrName, type: outType, graphqlType: graphQLType, attribute: attr });
    }
    return targetAttrs;
}