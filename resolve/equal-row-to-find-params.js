"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (params, row, id, models) => {
    const model = models[id];
    for (let paramName in params) {
        if (typeof (model.attributes[paramName]) !== "undefined" && params[paramName] !== row[paramName]) {
            return false;
        }
    }
    return true;
};
