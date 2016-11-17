"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (id, generator) => {
    const model = generator.getModel(id);
    const modelType = generator.getType(model.id);
    let mutations = [];
    return mutations;
};
