"use strict";
const generate_type_for_model_1 = require('./generate-type-for-model');
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
            this.types[lName] = generate_type_for_model_1.default(name, this.models[name], this);
        }
        return this.types[lName];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Generator;
