"use strict";
class SailsAdapter {
    constructor(app) {
        this.app = app;
    }
    findOne(modelId, id) {
        return this.app.models[modelId].findOne(id);
    }
    findMany(modelId, findCriteria) {
        throw new Error("Not implemented findMany");
    }
    hasNextPage(modelId, findCriteria) {
        throw new Error("Not implemented hasNextPage");
    }
    hasPreviousPage(modelId, findCriteria) {
        throw new Error("Not implemented hasPreviousPage");
    }
    populate(modelId, attr) {
        throw new Error("Not implemented populate");
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SailsAdapter;
