"use strict";
const graphql_1 = require('graphql');
function default_1(model) {
    let args = {};
    for (let attrName in model._attributes) {
        let attr = model._attributes[attrName];
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
                break;
        }
    }
    return args;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
