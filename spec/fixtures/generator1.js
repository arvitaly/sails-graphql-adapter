"use strict";
const generator_1 = require("./../../generate/generator");
const model1_1 = require("./model1");
const model2_1 = require("./model2");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    return new generator_1.default({
        models: {
            model2: model2_1.default,
            modelname1: model1_1.default,
        },
    });
};
