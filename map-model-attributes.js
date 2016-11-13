"use strict";
const graphql_1 = require('graphql');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (attributes) => {
    let targetAttrs = [];
    for (let attrName in attributes) {
        let attr = attributes[attrName];
        let type;
        if (typeof (attr) === "string") {
            type = attr;
        }
        else {
            type = attr.type;
        }
        let graphQLType;
        switch (type) {
            case "string":
                graphQLType = graphql_1.GraphQLString;
                break;
            case "integer" || "int":
                graphQLType = graphql_1.GraphQLInt;
                break;
            default:
                graphQLType = graphql_1.GraphQLString;
        }
        targetAttrs.push({ name: attrName, type: type, graphqlType: graphQLType });
    }
    return targetAttrs;
};
