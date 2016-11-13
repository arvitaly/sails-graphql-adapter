import { GraphQLString, GraphQLInt, GraphQLScalarType } from 'graphql';
export interface IAttrInfo { name: string, type: string, graphqlType: GraphQLScalarType }
export default (attributes: Waterline.Attributes): Array<IAttrInfo> => {
    let targetAttrs: Array<IAttrInfo> = [];
    for (let attrName in attributes) {
        let attr = attributes[attrName];
        let type: string;
        if (typeof (attr) === "string") {
            type = attr;
        } else {
            type = (attr as Waterline.BaseAttribute).type;
        }
        let graphQLType;
        switch (type) {
            case "string":
                graphQLType = GraphQLString;
                break;
            case "integer" || "int":
                graphQLType = GraphQLInt;
                break;
            default:
                graphQLType = GraphQLString;
        }
        targetAttrs.push({ name: attrName, type: type, graphqlType: graphQLType });
    }
    return targetAttrs;
}