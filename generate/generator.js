"use strict";
const type_1 = require('./type');
const resolver_1 = require('./../resolve/resolver');
class Generator {
    constructor(sails, models) {
        this.models = models;
        this.types = {};
        this.resolver = new resolver_1.default(sails, models);
    }
    getModel(id) {
        return this.models[id];
    }
    getType(name) {
        if (!name) {
            throw new Error("Name should be set");
        }
        const lName = name.toLowerCase();
        if (!this.types[lName]) {
            this.types[lName] = type_1.default(this.getModel(name), this);
        }
        return this.types[lName];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Generator;
