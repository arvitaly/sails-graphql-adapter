"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const sails_fixture_app_1 = require("sails-fixture-app");
const models_1 = require("./../models");
describe("Model tests", () => {
    let app;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        app = yield sails_fixture_app_1.start(__dirname + "/../__fixtures__/app1");
    }));
    afterEach((done) => {
        app.lower(done);
    });
    it("model", () => {
        const models = models_1.default(app);
        expect(models).toMatchSnapshot();
    });
});
