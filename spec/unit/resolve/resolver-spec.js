"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const resolver_1 = require("./../../../resolve/resolver");
const type_1 = require("./../../../resolve/type");
const generator1_1 = require("./../../fixtures/generator1");
const model1_1 = require("./../../fixtures/model1");
describe("Resolver spec", () => {
    pit("when resolve existing model should return it", () => __awaiter(this, void 0, void 0, function* () {
        const findSpy = spyOn(model1_1.default, "find");
        const m1 = {
            id: 1,
            name: "nameTest",
            title: "titleTest",
        };
        findSpy.and.returnValue([m1]);
        const resolver = new resolver_1.default(generator1_1.default);
        const result = yield resolver.resolve({
            args: {
                nameContains: "te",
            },
            identity: "modelname1",
            type: type_1.default.Model,
        });
        expect(result).toEqual(m1);
    }));
});
