"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Waterline = require('waterline');
const graphql_1 = require('graphql');
const sailsMemoryAdapter = require('sails-memory');
const generate_1 = require('./../generate');
const model1Fix = { name: "Hello" };
const model1 = Waterline.Collection.extend({
    identity: "model1",
    connection: "default",
    attributes: {
        name: "string"
    }
});
describe("Generate schema spec", () => {
    let waterline, ontology;
    beforeAll((done) => {
        waterline = new Waterline();
        waterline.loadCollection(model1);
        waterline.initialize({
            adapters: { 'memory': sailsMemoryAdapter },
            connections: { default: { adapter: 'memory' } }
        }, (err, ontology_) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                fail(err);
                done();
                return;
            }
            ontology = ontology_;
            yield ontology.collections.model1.create(model1Fix);
            done();
        }));
    });
    it("when query single model without args should return selected fields", (done) => __awaiter(this, void 0, void 0, function* () {
        const schema = generate_1.default(waterline.collections);
        const results = yield graphql_1.graphql(schema, `query Q1 {model1{name}}`);
        expect(j(results.data)).toEqual({ model1: { name: model1Fix.name } });
        done();
    }));
    it("when query list of model without args should return array", (done) => __awaiter(this, void 0, void 0, function* () {
        const schema = generate_1.default(waterline.collections);
        const results = yield graphql_1.graphql(schema, `query Q1 {model1s{name}}`);
        expect(j(results.data)).toEqual({ model1s: [{ name: model1Fix.name }] });
        done();
    }));
});
function j(data) {
    return JSON.parse(JSON.stringify(data));
}
