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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (opts, models, sailsModels) => __awaiter(this, void 0, void 0, function* () {
    const model = this.models(opts.identity);
    let updated = {};
    const where = argsToFind_1.default(models[opts.identity], opts.mutateObject.where || {});
    model.attributes.map((attr) => {
        if (typeof (opts.mutateObject["set" + attr.capitalizeName]) !== "undefined") {
            updated[attr.name] = opts.mutateObject["set" + attr.capitalizeName][attr.name];
        }
    });
    const result = yield sailsModels[opts.identity].update(where, updated);
    let res = {};
    res[model.pluralizeQueryName] = result.map((r) => {
        return this.convertRow(model, r);
    });
    return res;
});
