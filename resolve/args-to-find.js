"use strict";
const attribute_type_1 = require('./../model/attribute-type');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (model, args) => {
    let where = {}, sort, skip, limit;
    for (let argName in args) {
        if (model.attributes[argName]) {
            where[argName] = args[argName];
        }
    }
    for (let attrName in model.attributes) {
        switch (model.attributes[attrName].type) {
            case attribute_type_1.default.String:
                if (args[attrName + "Contains"]) {
                    where[attrName] = { contains: args[attrName + "Contains"] };
                }
                if (args[attrName + "StartsWith"]) {
                    where[attrName] = { contains: args[attrName + "StartsWith"] };
                }
                if (args[attrName + "EndsWith"]) {
                    where[attrName] = { contains: args[attrName + "EndsWith"] };
                }
                if (args[attrName + "Like"]) {
                    where[attrName] = { contains: args[attrName + "Like"] };
                }
                break;
        }
    }
    return {
        where: where,
        sort: sort,
        skip: skip,
        limit: limit
    };
};
