"use strict";
// import { mutationWithClientMutationId } from 'graphql-relay';
const capitalize_1 = require("./../../utils/capitalize");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (model) => {
    const mutationName = "Create" + capitalize_1.default(model.name);
    let fields = {};
};
