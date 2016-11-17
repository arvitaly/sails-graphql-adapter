"use strict";
const for_scalar_type_1 = require("./for-scalar-type");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (attr, generator) => {
    const childModel = generator.getModel(attr.model);
    const childKey = childModel.getPrimaryAttribute();
    if (!childKey) {
        throw new Error("Not found primary key for generate args for field " + attr.name);
    }
    return for_scalar_type_1.default(attr.name, childKey.type);
};