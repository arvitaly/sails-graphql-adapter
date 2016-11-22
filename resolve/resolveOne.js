"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const prepareResolveOne_1 = require("./prepareResolveOne");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (opts) => __awaiter(this, void 0, void 0, function* () {
    const result = yield prepareResolveOne_1.default(opts);
    if (!result) {
        return null;
    }
    return result.row;
});
