import { Model } from './../model';
import AttributeType from './../model/attribute-type';
export interface FindParams {
    where?;
    sort?: string;
    skip?: number;
    limit?: number;
}
export default (model: Model, args) => {
    let where = {};
    for (let argName in args) {
        if (model.attributes[argName]) {
            where[argName] = args[argName];
        }
    }
    for (let attrName in model.attributes) {
        let attrType = model.attributes[attrName].type;
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
                    where[attrName] = { contains: args[attrName + "Like"] };
                }
                break;
            case AttributeType.Float:
            case AttributeType.Integer:
            case AttributeType.Date:
            case AttributeType.Datetime:
                if (args[attrName + 'LessThan']) {
                    where[attrName] = { lessThan: attrType === AttributeType.Date || attrType === AttributeType.Datetime ? new Date(args[attrName + 'LessThan']) : args[attrName + 'LessThan'] };
                }
                if (args[attrName + 'LessThanOrEqual']) {
                    where[attrName] = { lessThanOrEqual: attrType === AttributeType.Date || attrType === AttributeType.Datetime ? new Date(args[attrName + 'LessThan']) : args[attrName + 'LessThanOrEqual'] };
                }
                if (args[attrName + 'GreaterThan']) {
                    where[attrName] = { greaterThan: attrType === AttributeType.Date || attrType === AttributeType.Datetime ? new Date(args[attrName + 'LessThan']) : args[attrName + 'GreaterThan'] };
                }
                if (args[attrName + 'GreaterThanOrEqual']) {
                    where[attrName] = { greaterThanOrEqual: attrType === AttributeType.Date || attrType === AttributeType.Datetime ? new Date(args[attrName + 'LessThan']) : args[attrName + 'GreaterThanOrEqual'] };
                }
                break;
        }
        if (args[attrName + "In"]) {
            where[attrName] = args[attrName + "In"];
        }
    }
    return {
        where: where,
        sort: args.sort,
        skip: args.skip,
        limit: args.limit
    }
}