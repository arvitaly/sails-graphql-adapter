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
const model2Fix = { id: 3 };
const model1Fix = { name: "Hello", model2Field: 3 };
const model1 = Waterline.Collection.extend({
    identity: "model1",
    connection: "default",
    attributes: {
        name: "string",
        description: {
            type: "string"
        },
        model2Field: {
            model: "model2"
        }
    }
});
const model2 = Waterline.Collection.extend({
    identity: "model2",
    connection: "default"
});
describe("Generate schema spec", () => {
    let waterline, ontology, schema;
    beforeAll((done) => {
        waterline = new Waterline();
        waterline.loadCollection(model2);
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
            yield ontology.collections.model2.create(model2Fix);
            yield ontology.collections.model1.create(model1Fix);
            schema = generate_1.default(waterline.collections);
            done();
        }));
    });
    it("when query single model without args should return selected fields", (done) => __awaiter(this, void 0, void 0, function* () {
        const results = yield graphql_1.graphql(schema, `query Q1 {model1{name}}`);
        expect(j(results.data)).toEqual({ model1: { name: model1Fix.name } });
        done();
    }));
    it("when query list of model without args should return array", (done) => __awaiter(this, void 0, void 0, function* () {
        const results = yield graphql_1.graphql(schema, `query Q1 {model1s{name}}`);
        expect(j(results.data)).toEqual({ model1s: [{ name: model1Fix.name }] });
        done();
    }));
    it("when call create mutation model should be added", (done) => __awaiter(this, void 0, void 0, function* () {
        const results = yield graphql_1.graphql(schema, `mutation M1 {updateModel1(input:{clientMutationId:"1", id: 1, setName:{name:"test"} } ){clientMutationId,model1{name} } }`);
        expect(j(results.data)).toEqual({ updateModel1: { clientMutationId: "1", model1: { name: "test" } } });
        //console.log(results.errors.map(e => e.message));
        done();
    }));
    it("when query single model without args should return selected fields", (done) => __awaiter(this, void 0, void 0, function* () {
        const results = yield graphql_1.graphql(schema, `query Q1 {model1{model2Field{id}}}`);
        expect(j(results.data)).toEqual({ model1: { model2Field: { id: model2Fix.id } } });
        done();
    }));
});
function j(data) {
    return JSON.parse(JSON.stringify(data));
}
