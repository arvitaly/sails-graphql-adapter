"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const graphql_models_1 = require("graphql-models");
class SailsAdapter {
    constructor(app, collection) {
        this.app = app;
        this.collection = collection;
    }
    findOne(modelId, id, populates) {
        return __awaiter(this, void 0, void 0, function* () {
            let rowObject = this.app.models[modelId].findOne(id);
            populates.map((populate) => {
                rowObject = rowObject.populate(populate.attribute.realName);
            });
            const row = (yield rowObject).toJSON();
            yield Promise.all(populates.map((populate) => __awaiter(this, void 0, void 0, function* () {
                if (populate.attribute.type === graphql_models_1.AttributeTypes.Collection) {
                    row[populate.attribute.realName] = yield Promise.all(row[populate.attribute.realName].map((r) => __awaiter(this, void 0, void 0, function* () {
                        return yield this.populate(populate.attribute.model, r, populate.fields);
                    })));
                }
                else {
                    row[populate.attribute.realName] = yield this.populate(populate.attribute.model, row[populate.attribute.realName], populate.fields);
                }
            })));
            return row;
        });
    }
    populate(modelId, row, populates) {
        return __awaiter(this, void 0, void 0, function* () {
            row = Object.assign({}, row);
            yield Promise.all(populates.map((populate) => __awaiter(this, void 0, void 0, function* () {
                if (populate.attribute.type === graphql_models_1.AttributeTypes.Model) {
                    row[populate.attribute.realName] = yield this.findOne(populate.attribute.model, row[populate.attribute.realName], populate.fields);
                }
                if (populate.attribute.type === graphql_models_1.AttributeTypes.Collection) {
                    const realAttr = this.app.models[modelId].attributes[populate.attribute.name];
                    switch (this.getCollectionType(realAttr)) {
                        case "OneToMany":
                            const where = [{
                                    type: graphql_models_1.ArgumentTypes.Equal,
                                    name: realAttr.via,
                                    graphQLType: null,
                                    attribute: this.collection.get(realAttr.collection)
                                        .attributes.find((a) => a.name === realAttr.via),
                                    value: row[this.collection.get(modelId).getPrimaryKeyAttribute().realName],
                                }];
                            row[populate.attribute.realName] =
                                yield this.findMany(populate.attribute.model, {
                                    where,
                                }, populate.fields);
                            break;
                        case "ManyToMany":
                            const viaPopulateAttr = populate.attribute.model + "_" + populate.attribute.name + "_" + populate.attribute.model;
                            const viaModelId = modelId + "_" + populate.attribute.name + "__" + viaPopulateAttr;
                            const viaRows = yield this.app.models[viaModelId].find().populate(viaPopulateAttr);
                            let rows = [];
                            viaRows.map((viaRow) => {
                                rows = rows.concat(viaRow[viaPopulateAttr]);
                            });
                            row[populate.attribute.realName] = yield Promise.all(rows.map((r) => __awaiter(this, void 0, void 0, function* () {
                                return yield this.populate(populate.attribute.model, r, populate.fields);
                            })));
                            break;
                        case "ManyToManyDominant":
                            let viaPopulateAttr2;
                            if (realAttr.via) {
                                viaPopulateAttr2 = populate.attribute.model + "_" + realAttr.via;
                            }
                            else {
                                viaPopulateAttr2 =
                                    populate.attribute.model + "_" + populate.attribute.name + "_" +
                                        populate.attribute.model;
                            }
                            const viaModelId2 = modelId + "_" + populate.attribute.name + "__" + viaPopulateAttr2;
                            const viaRows2 = yield this.app.models[viaModelId2].find().populate(viaPopulateAttr2);
                            let rows2 = [];
                            viaRows2.map((viaRow) => {
                                rows2 = rows2.concat(viaRow[viaPopulateAttr2]);
                            });
                            row[populate.attribute.realName] = yield Promise.all(rows2.map((r) => __awaiter(this, void 0, void 0, function* () {
                                return yield this.populate(populate.attribute.model, r, populate.fields);
                            })));
                            break;
                        default:
                    }
                }
            })));
            return row;
        });
    }
    findMany(modelId, findCriteria, populates) {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = { where: findCriteriaWhereToWhere(findCriteria) };
            if (findCriteria.first) {
                criteria.limit = findCriteria.first;
            }
            let resultObject = this.app.models[modelId].find(criteria);
            populates.map((populate) => {
                resultObject = resultObject.populate(populate.attribute.name);
            });
            const result = yield resultObject;
            return result.map((row) => row.toJSON());
        });
    }
    hasNextPage(modelId, findCriteria) {
        return true;
    }
    hasPreviousPage(modelId, findCriteria) {
        return true;
    }
    createOne(modelId, created) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.app.models[modelId].create(created);
            return result;
        });
    }
    updateOne(modelId, id, updated) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.app.models[modelId].update(id, updated);
            return result[0];
        });
    }
    getCollectionType(attribute) {
        const via = attribute.via;
        const viaAttr = this.app.models[attribute.collection].attributes[via];
        if (viaAttr && viaAttr.model) {
            return "OneToMany";
        }
        if (attribute.dominant) {
            return "ManyToManyDominant";
        }
        else {
            return "ManyToMany";
        }
    }
}
function findCriteriaWhereToWhere(findCriteria) {
    let where = {};
    findCriteria.where.map((arg) => {
        switch (arg.type) {
            case graphql_models_1.ArgumentTypes.Equal:
                where[arg.attribute.name] = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.NotEqual:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].not = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.IsNull:
                where[arg.attribute.name] = null;
                break;
            case graphql_models_1.ArgumentTypes.IsNotNull:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].not = null;
                break;
            case graphql_models_1.ArgumentTypes.In:
                where[arg.attribute.name] = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.NotIn:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].not = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.StartsWith:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].startsWith = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.NotStartsWith:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                if (!where[arg.attribute.name].not) {
                    where[arg.attribute.name].not = {};
                }
                where[arg.attribute.name].not.startsWith = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.EndsWith:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].endsWith = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.NotEndsWith:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                if (!where[arg.attribute.name].not) {
                    where[arg.attribute.name].not = {};
                }
                where[arg.attribute.name].not.endsWith = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.Contains:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].contains = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.NotContains:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                if (!where[arg.attribute.name].not) {
                    where[arg.attribute.name].not = {};
                }
                where[arg.attribute.name].not.contains = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.Like:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].like = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.NotLike:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                if (!where[arg.attribute.name].not) {
                    where[arg.attribute.name].not = {};
                }
                where[arg.attribute.name].not.like = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.GreaterThan:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].greaterThan = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.GreaterThanOrEqual:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].greaterThanOrEqual = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.LessThan:
                if (!where[arg.attribute.name]) {
                    where[arg.attribute.name] = {};
                }
                where[arg.attribute.name].lessThan = arg.value;
                break;
            case graphql_models_1.ArgumentTypes.LessThanOrEqual:
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
exports.findCriteriaWhereToWhere = findCriteriaWhereToWhere;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SailsAdapter;
