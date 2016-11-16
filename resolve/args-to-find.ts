import { Model } from './../model';
import AttributeType from './../model/attribute-type';
export interface FindParams {
    where?;
    sort?: string;
    skip?: number;
    limit?: number;
}
export default (model: Model, args) => {
    let where = {}, sort, skip, limit;
    for (let argName in args) {
        if (model.attributes[argName]) {
            where[argName] = args[argName];
        }
    }
    for (let attrName in model.attributes) {
        switch (model.attributes[attrName].type) {
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
        }
    }
    return {
        where: where,
        sort: sort,
        skip: skip,
        limit: limit
    }
}