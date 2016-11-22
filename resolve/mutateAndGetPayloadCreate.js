"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const convertRow_1 = require("./convertRow");
const generateCreateParams_1 = require("./generateCreateParams");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (opts, models, sailsModels) => __awaiter(this, void 0, void 0, function* () {
    const model = models[opts.identity];
    let created = generateCreateParams_1.default(opts.identity, opts.mutateObject, models);
    const result = (yield sailsModels[opts.identity].create(created));
    let res = {};
    res[model.queryName] = convertRow_1.default(model, result);
    sailsModels[opts.identity].publishCreate(result);
    return res;
});
