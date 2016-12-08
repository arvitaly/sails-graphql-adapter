import { Adapter, ArgumentTypes, Collection, FindCriteria, ModelID, PopulateFields } from "graphql-models";
import Sails = require("sails");
class SailsAdapter {
    constructor(protected app: Sails.App) { }
    public async findOne(modelId: string, id: any, populates: PopulateFields) {
        let rowObject = this.app.models[modelId].findOne(id);
        populates.map((populate) => {
            rowObject = rowObject.populate(populate.attribute.name);
        });
        return (await rowObject).toJSON();
    }
    public async findMany(modelId: string, findCriteria: FindCriteria, populates: PopulateFields) {
        let criteria: any = { where: findCriteriaWhereToWhere(findCriteria) };
        if (findCriteria.first) {
            criteria.limit = findCriteria.first;
        }
        const result = await this.app.models[modelId].find(criteria);
        return result.map((row) => row.toJSON());
    }
    public hasNextPage(modelId: string, findCriteria: FindCriteria): boolean {
        return true;
    }
    public hasPreviousPage(modelId: string, findCriteria: FindCriteria): boolean {
        return true;
    }
    public async createOne(modelId: ModelID, created: any) {
        const result = await this.app.models[modelId].create(created);
        return result;
    }
    public async updateOne(modelId: ModelID, id: any, updated: any) {
        const result = await this.app.models[modelId].update(id, updated);
        return result[0];
    }
}
export function findCriteriaWhereToWhere(findCriteria: FindCriteria) {
    let where: any = {};
    findCriteria.where.map((arg) => {
        switch (arg.type) {
            case ArgumentTypes.Equal:
                where[arg.attribute.name] = arg.value;
                break;
            case ArgumentTypes.NotEqual:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].not = arg.value;
                break;
            case ArgumentTypes.IsNull:
                where[arg.attribute.name] = null;
                break;
            case ArgumentTypes.IsNotNull:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].not = null;
                break;
            case ArgumentTypes.In:
                where[arg.attribute.name] = arg.value;
                break;
            case ArgumentTypes.NotIn:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].not = arg.value;
                break;
            case ArgumentTypes.StartsWith:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].startsWith = arg.value;
                break;
            case ArgumentTypes.NotStartsWith:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                if (!where[arg.attribute.name].not) {
                    where[arg.attribute.name].not = {};
                }
                where[arg.attribute.name].not.startsWith = arg.value;
                break;
            case ArgumentTypes.EndsWith:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].endsWith = arg.value;
                break;
            case ArgumentTypes.NotEndsWith:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                if (!where[arg.attribute.name].not) {
                    where[arg.attribute.name].not = {};
                }
                where[arg.attribute.name].not.endsWith = arg.value;
                break;
            case ArgumentTypes.Contains:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].contains = arg.value;
                break;
            case ArgumentTypes.NotContains:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                if (!where[arg.attribute.name].not) {
                    where[arg.attribute.name].not = {};
                }
                where[arg.attribute.name].not.contains = arg.value;
                break;
            case ArgumentTypes.Like:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].like = arg.value;
                break;
            case ArgumentTypes.NotLike:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                if (!where[arg.attribute.name].not) {
                    where[arg.attribute.name].not = {};
                }
                where[arg.attribute.name].not.like = arg.value;
                break;
            case ArgumentTypes.GreaterThan:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].greaterThan = arg.value;
                break;
            case ArgumentTypes.GreaterThanOrEqual:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].greaterThanOrEqual = arg.value;
                break;
            case ArgumentTypes.LessThan:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].lessThan = arg.value;
                break;
            case ArgumentTypes.LessThanOrEqual:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].lessThanOrEqual = arg.value;
                break;
            default:
                throw new Error("Unsupported argument type " + arg.type);
        }
    });
    return where;
}
export default SailsAdapter;
