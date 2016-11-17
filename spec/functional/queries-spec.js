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
const app1_1 = require("./app1");
const graphql_1 = require("graphql");
/* tslint:disable:no-string-literal */
describe("Function tests for queries", () => {
    beforeEach((done) => {
        global["l"] = console.log;
        app1_1.default(done);
    });
    pit("query for single model", () => __awaiter(this, void 0, void 0, function* () {
        // TODO: create test for single model
        yield sails.models["model1"].create({ name: "n1" });
        const schema = generate_1.default(sails);
        expect(j(yield graphql_1.graphql(schema, `query Q1 {model1(nameContains:"n1"){name}}`))).toEqual({
            model1: {
                name: "n1",
            },
        });
    }));
    pit("query for connection of model", () => __awaiter(this, void 0, void 0, function* () {
        // TODO: create test for connection of model
        yield sails.models["model1"].create([{ name: "n1" }, { name: "n2" }]);
        const schema = generate_1.default(sails);
        const result = yield graphql_1.graphql(schema, `query Q1 {model1s(nameContains:"n"){edges{node{name} }}}`);
        expect(j(result)).toEqual({
            model1s: {
                edges: [{
                        node: {
                            name: "n1",
                        },
                    }, {
                        node: {
                            name: "n2",
                        },
                    }],
            },
        });
    }));
    it("query for count of model", () => {
        // TODO: create test for count of model
    });
    afterEach((done) => {
        sails.lower(done);
    });
});
function j(data) {
    return JSON.parse(JSON.stringify(data)).data;
}
