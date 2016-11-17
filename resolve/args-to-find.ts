import AttributeType from "./../model/attribute-type";
import Model from "./../model/model";
export type FindParams = {
    where?;
    sort?: string;
    skip?: number;
    limit?: number;
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
            case AttributeType.Float:
            case AttributeType.Integer:
            case AttributeType.Date:
            case AttributeType.Datetime:
                if (args[attrName + "LessThan"]) {
                    where[attrName] = {
                        lessThan: attrType === AttributeType.Date || attrType === AttributeType.Datetime ?
                            new Date(args[attrName + "LessThan"]) :
                            args[attrName + "LessThan"],
                    };
                }
                if (args[attrName + "LessThanOrEqual"]) {
                    where[attrName] = {
                        lessThanOrEqual: attrType === AttributeType.Date || attrType === AttributeType.Datetime ?
                            new Date(args[attrName + "LessThan"]) :
                            args[attrName + "LessThanOrEqual"],
                    };
                }
                if (args[attrName + "GreaterThan"]) {
                    where[attrName] = {
                        greaterThan: attrType === AttributeType.Date || attrType === AttributeType.Datetime ?
                            new Date(args[attrName + "LessThan"]) :
                            args[attrName + "GreaterThan"],
                    };
                }
                if (args[attrName + "GreaterThanOrEqual"]) {
                    where[attrName] = {
                        greaterThanOrEqual: attrType === AttributeType.Date || attrType === AttributeType.Datetime ?
                            new Date(args[attrName + "LessThan"]) :
                            args[attrName + "GreaterThanOrEqual"],
                    };
                }
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
