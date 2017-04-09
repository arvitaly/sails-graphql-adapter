import {
    Adapter, ArgumentTypes, AttributeTypes,
    Collection, FindCriteria, ModelID, PopulateFields,
} from "graphql-models";
import CreateDuplicateError from "graphql-models/CreateDuplicateError";
import Sails = require("sails");
import Waterline = require("waterline");
class SailsAdapter {
    constructor(protected app: Sails.App, protected collection: Collection = null) { }
    public setCollection(collection: Collection) {
        this.collection = collection;
    }
    public async findOne(modelId: ModelID, id: any, populates: PopulateFields) {
        let rowObject = this.app.models[modelId].findOne(id);
        populates.map((populate) => {
            rowObject = rowObject.populate(populate.attribute.realName);
        });
        const row = (await rowObject).toJSON();
        await this.populateRow(row, populates);
        return row;
    }
    public async populate(modelId: ModelID, row, populates: PopulateFields) {
        if (typeof (row) === "undefined" || row === null) {
            return null;
        }
        row = Object.assign({}, row);
        await Promise.all(populates.map(async (populate) => {
            if (populate.attribute.type === AttributeTypes.Model) {
                if (row[populate.attribute.realName]) {
                    row[populate.attribute.realName] = await this.findOne(
                        populate.attribute.model, row[populate.attribute.realName], populate.fields);
                }
            }
            if (populate.attribute.type === AttributeTypes.Collection) {
                const realAttr =
                    this.app.models[modelId].attributes[populate.attribute.name] as Waterline.ManyToManyAttribute;
                switch (this.getCollectionType(realAttr)) {
                    case "OneToMany":
                        const where = [{
                            type: ArgumentTypes.Equal,
                            name: realAttr.via,
                            graphQLType: null,
                            attribute: this.collection.get(realAttr.collection)
                                .attributes.find((a) => a.name === realAttr.via),
                            value: row[this.collection.get(modelId).getPrimaryKeyAttribute().realName],
                        }];
                        row[populate.attribute.realName] =
                            await this.findMany(populate.attribute.model, {
                                where,
                            }, populate.fields);
                        break;
                    case "ManyToMany":
                        let viaPopulateAttr;
                        if (realAttr.via) {
                            viaPopulateAttr = populate.attribute.model + "_" + realAttr.via;
                        } else {
                            viaPopulateAttr =
                                populate.attribute.model + "_" + populate.attribute.name + "_" +
                                populate.attribute.model;
                        }
                        const viaModelId = modelId + "_" + populate.attribute.name + "__" + viaPopulateAttr;
                        const viaRows = await this.app.models[viaModelId].find({
                            where: {
                                [modelId + "_" + populate.attribute.name]:
                                row[this.collection.get(modelId).getPrimaryKeyAttribute().realName],
                            },
                        }).populate(viaPopulateAttr);
                        let rows = [];
                        viaRows.map((viaRow) => {
                            rows = rows.concat(viaRow[viaPopulateAttr]);
                        });
                        row[populate.attribute.realName] = await Promise.all(rows.map(async (r) => {
                            return await this.populate(populate.attribute.model, r, populate.fields);
                        }));
                        break;
                    case "ManyToManyDominant":
                        let viaPopulateAttr2;
                        if (realAttr.via) {
                            viaPopulateAttr2 = populate.attribute.model + "_" + realAttr.via;
                        } else {
                            viaPopulateAttr2 =
                                populate.attribute.model + "_" + populate.attribute.name + "_" +
                                populate.attribute.model;
                        }
                        const viaModelId2 = modelId + "_" + populate.attribute.name + "__" + viaPopulateAttr2;
                        const viaRows2 = await this.app.models[viaModelId2].find({
                            where: {
                                [viaPopulateAttr2]: row[this.collection.get(modelId).getPrimaryKeyAttribute().realName],
                            },
                        }).populate(viaPopulateAttr2);
                        let rows2 = [];
                        viaRows2.map((viaRow) => {
                            rows2 = rows2.concat(viaRow[viaPopulateAttr2]);
                        });
                        row[populate.attribute.realName] = await Promise.all(rows2.map(async (r) => {
                            return await this.populate(populate.attribute.model, r, populate.fields);
                        }));
                        break;
                    default:
                }
            }
        }));
        return row;
    }
    public async findMany(modelId: string, findCriteria: FindCriteria, populates: PopulateFields) {
        const criteria: any = { where: findCriteriaWhereToWhere(findCriteria) };
        if (findCriteria.first) {
            criteria.limit = findCriteria.first;
        }
        if (findCriteria.sort) {
            criteria.sort = findCriteria.sort;
        }
        let resultObject = this.app.models[modelId].find(criteria);
        populates.map((populate) => {
            resultObject = resultObject.populate(populate.attribute.name);
        });
        const result = await resultObject;
        const rows = result.map((row) => row.toJSON());
        return await Promise.all(rows.map(async (row) => {
            await this.populateRow(row, populates);
            return row;
        }));
    }
    public hasNextPage(modelId: string, findCriteria: FindCriteria): boolean {
        return true;
    }
    public hasPreviousPage(modelId: string, findCriteria: FindCriteria): boolean {
        return true;
    }
    public async createOne(modelId: ModelID, created: any) {
        try {
            const result = await this.app.models[modelId].create(created);
            return result;
        } catch (e) {
            if (e.toString().indexOf("already exists") > -1) {
                throw new CreateDuplicateError(e);
            } else {
                throw e;
            }
        }
    }
    public async findOrCreateOne(modelId: ModelID, created: any) {
        const uniqueAttrName = Object.keys(created).map((attrName) => {
            if (this.app.models[modelId].attributes[attrName] &&
                (this.app.models[modelId].attributes[attrName] as Waterline.BaseAttribute<any>).unique) {
                return attrName;
            }
        }).find((a) => !!a);
        if (uniqueAttrName) {
            const result = await this.app.models[modelId].findOrCreate({ [uniqueAttrName]: created[uniqueAttrName] });
            return result;
        } else {
            throw new Error("Not found unique attribute for model " + modelId);
        }
    }
    public async updateOne(modelId: ModelID, id: any, updated: any) {
        const result = await this.app.models[modelId].update(id, updated);
        return result[0];
    }
    protected async populateRow(row, populates: PopulateFields) {
        await Promise.all(populates.map(async (populate) => {
            if (populate.attribute.type === AttributeTypes.Collection) {
                row[populate.attribute.realName] =
                    await Promise.all(row[populate.attribute.realName].map(async (r) => {
                        return await this.populate(populate.attribute.model, r, populate.fields);
                    }));
            } else {
                row[populate.attribute.realName] = await this.populate(populate.attribute.model,
                    row[populate.attribute.realName], populate.fields);
            }
        }));
    }
    protected getCollectionType(attribute: Waterline.Attribute): AttributeCollectionType {
        const via = (attribute as Waterline.OneToManyAttribute).via;
        const viaAttr = this.app.models[(attribute as Waterline.OneToManyAttribute).collection].attributes[via];
        if (viaAttr && (viaAttr as Waterline.OneToOneAttribute).model) {
            return "OneToMany";
        }
        if ((attribute as Waterline.ManyToManyAttribute).dominant) {
            return "ManyToManyDominant";
        } else {
            return "ManyToMany";
        }
    }
}
export type AttributeCollectionType = "OneToMany" | "ManyToMany" | "ManyToManyDominant";
export function findCriteriaWhereToWhere(findCriteria: FindCriteria) {
    const where: any = {};
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
