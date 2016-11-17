"use strict";
const create_1 = require("./mutations/create");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (id, generator) => {
    let mutations = create_1.default(id, generator);
    return mutations;
};
