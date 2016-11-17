import AttributeType from "./../model/attribute-type";
import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLString } from "graphql";
export default (type: AttributeType) => {
    switch (type) {
        case AttributeType.String:
            return GraphQLString;
        case AttributeType.Integer:
            return GraphQLInt;
        case AttributeType.Float:
            return GraphQLFloat;
        case AttributeType.Date:
            return GraphQLString;
        case AttributeType.Datetime:
            return GraphQLString;
        case AttributeType.Boolean:
            return GraphQLBoolean;
        default:
            throw new Error("Unknown scalar type " + AttributeType[type]);
    }
};
