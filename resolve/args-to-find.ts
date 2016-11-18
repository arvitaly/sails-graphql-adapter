import AttributeType from "./../model/attribute-type";
import Model from "./../model/model";
import decapitalize from "./../utils/decapitalize";
export type FindParams = {
    where?;
    sort?: string;
    skip?: number;
    limit?: number;
}
function addStringArgs(where, args, attrName) {
    const postfixes = ["Contains", "StartsWith", "EndsWith", "Like"];
    postfixes.map((postfix) => {
        if (args[attrName + postfix]) {
            if (!where[attrName]) {
                where[attrName] = {};
            }
            where[attrName][decapitalize(postfix)] = args[attrName + postfix];
        }
    });
}
function addNumericArgs(where, args, attrName, attrType: AttributeType) {
    const postfixes = ["LessThan", "LessThanOrEqual", "GreaterThan", "GreaterThanOrEqual"];
    postfixes.map((postfix) => {
        if (args[attrName + postfix]) {
            if (!where[attrName]) {
                where[attrName] = {};
            }
            where[attrName][decapitalize(postfix)] =
                attrType === AttributeType.Date || attrType === AttributeType.Datetime ?
                    new Date(args[attrName + postfix]) :
                    args[attrName + postfix];
        }
    });
}
export default (model: Model, args: any) => {
    let where = {};
    let countArgs = 0;
    let params: FindParams = {};
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
            case AttributeType.String:
                addStringArgs(where, args, attrName);
                break;
            case AttributeType.Float:
            case AttributeType.Integer:
            case AttributeType.Date:
            case AttributeType.Datetime:
                addNumericArgs(where, args, attrName, attrType);
                break;
            case AttributeType.Boolean:
                // TODO 
                break;
            case AttributeType.Model:
                // TODO
                break;
            default:
                throw new Error("Unknown attr type " + AttributeType[attrType] + " for args to find");
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
