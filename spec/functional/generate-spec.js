"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const graphql_1 = require('graphql');
const Sails = require('sails');
const generate_1 = require('./../../generate');
const SailsConstructor = Sails.constructor;
describe("Generate functional tests", () => {
    let sails, app;
    beforeEach((done) => {
        app = new SailsConstructor();
        app.load({
            log: {
                level: "warn"
            },
            models: {
                migrate: "drop"
            },
            appPath: __dirname + "/app1"
        }, (err, sails_) => {
            if (err) {
                fail(err);
                done();
                return;
            }
            sails = sails_;
            done();
        });
    });
    it("Test", (done) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield sails.models["model1"].create({ name: "test1" });
            const schema = generate_1.default(sails.models);
            expect(j(yield graphql_1.graphql(schema, `query Q1 {model1(nameContains:"ghj"){name}}`))).toEqual({
                data: {
                    model1: {
                        name: "test1"
                    }
                }
            });
            done();
        }
        catch (e) {
            fail(e);
            done();
        }
    }));
    afterEach((done) => {
        if (sails) {
            app.lower(done);
        }
        else {
            done();
        }
    });
});
function j(data) {
    return JSON.parse(JSON.stringify(data));
}
