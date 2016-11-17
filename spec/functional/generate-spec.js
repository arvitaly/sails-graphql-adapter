"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const generate_1 = require("./../../generate");
const graphql_1 = require("graphql");
const Sails = require("sails");
const SailsConstructor = Sails.constructor;
describe("Functional tests for generate", () => {
    let sails;
    let app;
    beforeEach((done) => {
        app = new SailsConstructor();
        app.load({
            appPath: __dirname + "/../fixtures/app1",
            connections: {
                memory: {
                    adapter: "sails-memory",
                },
            },
            log: {
                level: "warn",
            },
            models: {
                connection: "memory",
                migrate: "drop",
            },
        }, (err, sailsNew) => {
            if (err) {
                fail(err);
                done();
                return;
            }
            sails = sailsNew;
            done();
        });
    });
    /* tslint:disable:no-string-literal */
    pit("when args has nameContains and name contains it, should return one record", () => __awaiter(this, void 0, void 0, function* () {
        yield sails.models["model1"].create({ name: "test1" });
        const schema = generate_1.default(sails);
        expect(j(yield graphql_1.graphql(schema, `query Q1 {model1(nameContains:"te"){name}}`))).toEqual({
            model1: {
                name: "test1",
            },
        });
    }));
    pit("when args has nameContains and name not contains it, should return null", () => __awaiter(this, void 0, void 0, function* () {
        yield sails.models["model1"].create({ name: "test1" });
        const schema = generate_1.default(sails);
        expect(j(yield graphql_1.graphql(schema, `query Q1 {model1(nameContains:"fe"){name}}`))).toEqual({ model1: null });
    }));
    pit("when args has In and model in one of values, should return one record", () => __awaiter(this, void 0, void 0, function* () {
        yield sails.models["model1"].create({ num: 14 });
        const schema = generate_1.default(sails);
        expect(j(yield graphql_1.graphql(schema, `query Q1 {model1(numIn:[14,15]){num}}`))).toEqual({
            model1: {
                num: 14,
            },
        });
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
    return JSON.parse(JSON.stringify(data)).data;
}
