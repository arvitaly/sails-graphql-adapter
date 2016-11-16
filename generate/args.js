"use strict";
const graphql_1 = require('graphql');
function default_1(model) {
    let args = {};
    for (let attrName in model.attributes) {
        let attr = model.attributes[attrName];
        let type;
        if (typeof (attr) === "string") {
            type = attr;
        }
        else {
            type = attr.type;
        }
        switch (type) {
            case "string":
                args[attrName] = {
                    type: graphql_1.GraphQLString,
                    defaultValue: null,
                    description: attrName
                };
                args[attrName + "Contains"] = {
                    type: graphql_1.GraphQLString,
                    defaultValue: null,
                    description: attrName
                };
                args[attrName + "StartsWith"] = {
                    type: graphql_1.GraphQLString,
                    defaultValue: null,
                    description: attrName
                };
                args[attrName + "EndsWith"] = {
                    type: graphql_1.GraphQLString,
                    defaultValue: null,
                    description: attrName
                };
                args[attrName + "Like"] = {
                    type: graphql_1.GraphQLString,
                    defaultValue: null,
                    description: attrName
                };
                args[attrName + "In"] = {
                    defaultValue: null,
                    description: attrName,
                    type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)),
                };
                break;
        }
    }
    return args;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
