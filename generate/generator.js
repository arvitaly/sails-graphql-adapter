"use strict";
const model_1 = require("./../model");
const resolver_1 = require("./../resolve/resolver");
const create_type_1 = require("./mutations/create-type");
const type_1 = require("./type");
const graphql_relay_1 = require("graphql-relay");
class Generator {
    constructor(sails) {
        this.sails = sails;
        this.models = {};
        this.types = {};
        this.createTypes = {};
        this.connectionTypes = {};
        console.log("generator");
        this.sailsModels = sailsModelsToArray(sails.models);
        this.sailsModels.map((sailsModel) => {
            this.models[sailsModel.identity] = model_1.default(sailsModel);
        });
        this.resolver = new resolver_1.default(this);
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
    getCreateType(id) {
        if (!this.createTypes[id]) {
            this.createTypes[id] = create_type_1.default(id, this);
        }
        return this.createTypes[id];
    }
    getConnectionType(name) {
        if (!this.connectionTypes[name]) {
            this.connectionTypes[name] = graphql_relay_1.connectionDefinitions({ nodeType: this.getType(name) }).connectionType;
        }
        return this.connectionTypes[name];
    }
    getType(name) {
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
