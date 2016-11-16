import { GraphQLString, GraphQLInt, GraphQLScalarType } from 'graphql';
import AttributeType from './attribute-type';
import { Attribute } from './'
export interface IAttrInfo { name: string, type: AttributeType, graphqlType: GraphQLScalarType, attribute: Waterline.Attribute }
export default (name: string, attr: Waterline.Attribute): Attribute => {
    let type: string = "", outType: AttributeType, model: string = "";
    if (typeof (attr) === "string") {
        type = attr;
    } else {
        type = (attr as Waterline.BaseAttribute).type;
    }
    switch (("" + type).toLowerCase()) {
        case "string":
            outType = AttributeType.String;
            break;
        case "integer":
        case "int":
            outType = AttributeType.Integer;
            break;
        case "datetime":
            outType = AttributeType.Datetime;
            break;
    }
    if (attr['model']) {
        outType = AttributeType.Model;
        model = (attr as Waterline.ModelAttribute).model.toLowerCase();
    }
    if (attr['collection']) {
        outType = AttributeType.Collection;
    }
    if (!outType) {
        outType = AttributeType.String
    }
    return {
        name: name,
        model: model,
        type: outType
    }
}