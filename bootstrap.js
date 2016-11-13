"use strict";
const generate_1 = require('./generate');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    sails['graphql'] = generate_1.default(sails.models);
};
