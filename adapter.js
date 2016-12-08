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
    constructor(app) {
        this.app = app;
    }
    findOne(modelId, id, populates) {
        return __awaiter(this, void 0, void 0, function* () {
            let rowObject = this.app.models[modelId].findOne(id);
            populates.map((populate) => {
                rowObject = rowObject.populate(populate.attribute.name);
            });
            return (yield rowObject).toJSON();
        });
    }
    findMany(modelId, findCriteria, populates) {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = { where: findCriteriaWhereToWhere(findCriteria) };
            if (findCriteria.first) {
                criteria.limit = findCriteria.first;
            }
            const result = yield this.app.models[modelId].find(criteria);
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
