"use strict";
const graphql_1 = require('graphql');
const attribute_type_1 = require('./attribute-type');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (attributes) => {
    let targetAttrs = [];
    for (let attrName in attributes) {
        let attr = attributes[attrName];
        let type = "";
        if (typeof (attr) === "string") {
            type = attr;
        }
        else {
            type = attr.type;
        }
        let graphQLType, outType;
        switch (("" + type).toLowerCase()) {
            case "string":
                graphQLType = graphql_1.GraphQLString;
                outType = attribute_type_1.default.String;
                break;
            case "integer" || "int":
                graphQLType = graphql_1.GraphQLInt;
                outType = attribute_type_1.default.Integer;
                break;
            case "datetime":
                outType = attribute_type_1.default.Datetime;
                graphQLType = graphql_1.GraphQLString;
                break;
            default:
                graphQLType = null;
        }
        if (attr['model']) {
            outType = attribute_type_1.default.Model;
        }
        if (attr['collection']) {
            outType = attribute_type_1.default.Model;
        }
        if (!outType) {
            outType = attribute_type_1.default.String;
        }
        targetAttrs.push({ name: attrName, type: outType, graphqlType: graphQLType, attribute: attr });
    }
    return targetAttrs;
};
