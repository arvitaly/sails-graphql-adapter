"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const argsToFind_1 = require("./argsToFind");
const convertRow_1 = require("./convertRow");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (opts, models, sailsModels) => __awaiter(this, void 0, void 0, function* () {
    const model = models[opts.identity];
    const args = argsToFind_1.default(model, opts.args);
    const result = (yield sailsModels[opts.identity].find(args));
    const connection = {
        edges: result.map((n) => {
            return {
                cursor: "",
                node: convertRow_1.default(model, n),
            };
        }),
        // TODO 
        pageInfo: {
            endCursor: "",
            hasNextPage: true,
            hasPreviousPage: true,
            startCursor: "",
        },
    };
    return connection;
});
