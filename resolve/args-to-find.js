"use strict";
const attribute_type_1 = require('./../model/attribute-type');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (model, args) => {
    let where = {}, countArgs = 0, params = {};
    for (let argName in args) {
        if (model.attributes[argName]) {
            where[argName] = args[argName];
        }
        countArgs++;
    }
    for (let attrName in model.attributes) {
        let attrType = model.attributes[attrName].type;
        switch (attrType) {
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
                    where[attrName] = { like: args[attrName + "Like"] };
                }
                break;
            case attribute_type_1.default.Float:
            case attribute_type_1.default.Integer:
            case attribute_type_1.default.Date:
            case attribute_type_1.default.Datetime:
                if (args[attrName + 'LessThan']) {
                    where[attrName] = { lessThan: attrType === attribute_type_1.default.Date || attrType === attribute_type_1.default.Datetime ? new Date(args[attrName + 'LessThan']) : args[attrName + 'LessThan'] };
                }
                if (args[attrName + 'LessThanOrEqual']) {
                    where[attrName] = { lessThanOrEqual: attrType === attribute_type_1.default.Date || attrType === attribute_type_1.default.Datetime ? new Date(args[attrName + 'LessThan']) : args[attrName + 'LessThanOrEqual'] };
                }
                if (args[attrName + 'GreaterThan']) {
                    where[attrName] = { greaterThan: attrType === attribute_type_1.default.Date || attrType === attribute_type_1.default.Datetime ? new Date(args[attrName + 'LessThan']) : args[attrName + 'GreaterThan'] };
                }
                if (args[attrName + 'GreaterThanOrEqual']) {
                    where[attrName] = { greaterThanOrEqual: attrType === attribute_type_1.default.Date || attrType === attribute_type_1.default.Datetime ? new Date(args[attrName + 'LessThan']) : args[attrName + 'GreaterThanOrEqual'] };
                }
                break;
        }
        if (args[attrName + "In"]) {
            where[attrName] = args[attrName + "In"];
        }
    }
    params['where'] = where;
    if (typeof (args.skip) !== "undefined") {
        params['skip'] = args.skip;
    }
    if (typeof (args.limit) !== "undefined") {
        params['limit'] = args.limit;
    }
    if (args.sort) {
        params['sort'] = args.sort;
    }
    return params;
};
