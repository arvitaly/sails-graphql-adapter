"use strict";
const create_1 = require("./mutations/create");
const update_1 = require("./mutations/update");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (id, generator) => {
    let mutations = create_1.default(id, generator);
    mutations = mutations.concat(update_1.default(id, generator));
    return mutations;
};
