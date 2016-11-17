"use strict";
const model_1 = require("./../model");
const resolver_1 = require("./../resolve/resolver");
const type_1 = require("./type");
class Generator {
    constructor(sails) {
        this.models = {};
        this.types = {};
        this.sailsModels = sailsModelsToArray(sails.models);
        this.sailsModels.map((sailsModel) => {
            this.models[sailsModel.identity] = model_1.default(sailsModel);
        });
        this.resolver = new resolver_1.default(sails, this.models);
    }
    mapSailsModels(cb) {
        return this.sailsModels.map(cb);
    }
    getModel(id) {
        if (!this.models[id]) {
            throw new Error("Not found model with id " + id);
        }
        return this.models[id];
    }
    getCreateType() {
        // TODO
    }
    getType(name) {
        if (!name) {
            throw new Error("Name should be set");
        }
        const lName = name.toLowerCase();
        if (!this.types[lName]) {
            this.types[lName] = type_1.default(name, this);
        }
        return this.types[lName];
    }
}
function sailsModelsToArray(sailsModels) {
    let arr = [];
    for (let modelName in sailsModels) {
        arr.push(sailsModels[modelName]);
    }
    return arr;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Generator;
