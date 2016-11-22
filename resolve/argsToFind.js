"use strict";
const attribute_type_1 = require("./../model/attribute-type");
const decapitalize_1 = require("./../utils/decapitalize");
function addStringArgs(where, args, attrName) {
    const postfixes = ["Contains", "StartsWith", "EndsWith", "Like"];
    postfixes.map((postfix) => {
        if (args[attrName + postfix]) {
            if (!where[attrName]) {
                where[attrName] = {};
            }
            where[attrName][decapitalize_1.default(postfix)] = args[attrName + postfix];
        }
    });
}
function addNumericArgs(where, args, attrName, attrType) {
    const postfixes = ["LessThan", "LessThanOrEqual", "GreaterThan", "GreaterThanOrEqual"];
    postfixes.map((postfix) => {
        if (args[attrName + postfix]) {
            if (!where[attrName]) {
                where[attrName] = {};
            }
            where[attrName][decapitalize_1.default(postfix)] =
                attrType === attribute_type_1.default.Date || attrType === attribute_type_1.default.Datetime ?
                    new Date(args[attrName + postfix]) :
                    args[attrName + postfix];
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (model, args) => {
    let where = {};
    let countArgs = 0;
    let params = {};
    if (args) {
        for (let argName in args) {
            if (model.getAttribute(argName)) {
                where[argName] = args[argName];
            }
            countArgs++;
        }
    }
    model.attributes.map((attr) => {
        const attrName = attr.name;
        const attrType = attr.type;
        switch (attrType) {
            case attribute_type_1.default.String:
                addStringArgs(where, args, attrName);
                break;
            case attribute_type_1.default.Float:
            case attribute_type_1.default.Integer:
            case attribute_type_1.default.Date:
            case attribute_type_1.default.Datetime:
                addNumericArgs(where, args, attrName, attrType);
                break;
            case attribute_type_1.default.Boolean:
                // TODO 
                break;
            case attribute_type_1.default.Model:
                // TODO
                break;
            default:
                throw new Error("Unknown attr type " + attribute_type_1.default[attrType] + " for args to find");
        }
        if (args[attrName + "In"]) {
            where[attrName] = args[attrName + "In"];
        }
    });
    params.where = where;
    if (typeof (args.skip) !== "undefined") {
        params.skip = args.skip;
    }
    if (typeof (args.limit) !== "undefined") {
        params.limit = args.limit;
    }
    if (args.sort) {
        params.sort = args.sort;
    }
    return params;
};
