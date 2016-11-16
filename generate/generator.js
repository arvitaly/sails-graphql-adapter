"use strict";
const type_1 = require('./type');
class Generator {
    constructor(models) {
        this.models = models;
        this.types = {};
    }
    getType(name) {
        if (!name) {
            throw new Error("Name should be set");
        }
        const lName = name.toLowerCase();
        if (!this.types[lName]) {
            this.types[lName] = type_1.default(this.models[name], this);
        }
        return this.types[lName];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Generator;
