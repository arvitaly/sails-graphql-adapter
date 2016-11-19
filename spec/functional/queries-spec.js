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
const graphql_relay_1 = require("graphql-relay");
const dt1 = new Date("Fri Nov 18 2016 18:25:11 GMT+0700 (SE Asia Standard Time)");
describe("Function tests for queries", () => {
    let query;
    pit("query for single model", () => __awaiter(this, void 0, void 0, function* () {
        const dt2 = new Date("Fri Nov 10 2016 18:25:11 GMT+0700 (SE Asia Standard Time)");
        const dt3 = new Date("Fri Nov 20 2016 18:25:11 GMT+0700 (SE Asia Standard Time)");
        yield createRow({ isActive: true, name: "fn1f" });
        expect(yield query(`query Q1 {modelName1(
                nameContains:"n1"
                isActive: true
                lastActiveGreaterThan:"${dt2}"                
                lastActiveLessThan :"${dt3}"
            ){name lastActive}}`)).toEqual({
            modelName1: {
                lastActive: dt1.toString(),
                name: "fn1f",
            },
        });
    }));
    pit("query for connection of model", () => __awaiter(this, void 0, void 0, function* () {
        yield createRow({ id: 5, name: "n1" });
        yield createRow({ id: 6, name: "n2" });
        const result = yield query(`query Q1 {modelName1s(nameContains:"n"){edges{node{ id name} }}}`);
        expect(result).toEqual({
            modelName1s: {
                edges: [
                    { node: { id: graphql_relay_1.toGlobalId("ModelName1", "5"), name: "n1" } },
                    { node: { id: graphql_relay_1.toGlobalId("ModelName1", "6"), name: "n2" } }],
            },
        });
    }));
    it("query for count of model", () => {
        // TODO: create test for count of model
    });
    /* tslint:disable:no-string-literal */
    beforeEach((done) => {
        global["l"] = console.log;
        app1_1.default(() => {
            const schema = generate_1.default(sails);
            query = (q) => __awaiter(this, void 0, void 0, function* () {
                const result = yield graphql_1.graphql(schema, q);
                if (result.errors) {
                    console.error(result.errors);
                    fail(result.errors);
                    return;
                }
                return j(result.data);
            });
            done();
        });
    });
    afterEach((done) => {
        sails.lower(done);
    });
});
function j(data) {
    return JSON.parse(JSON.stringify(data));
}
const row1 = {
    firstActive: dt1,
    isActive: false,
    lastActive: dt1,
    name: "n1",
    num: 0,
};
function getRow(params) {
    return Object.assign({}, row1, params);
}
;
function createRow(params) {
    return sails.models["modelname1"].create(getRow(params));
}
