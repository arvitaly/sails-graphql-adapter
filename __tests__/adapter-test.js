"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const graphql_models_1 = require("graphql-models");
const sails_fixture_app_1 = require("sails-fixture-app");
const adapter_1 = require("./../adapter");
const models_1 = require("./../models");
const dt1 = "2016-11-18T11:25:11.000Z";
describe("Adapter test", () => {
    let app;
    let adapter;
    let models;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        app = yield sails_fixture_app_1.start(__dirname + "/../__fixtures__/app1");
        models = models_1.default(app);
        adapter = new adapter_1.default(app, models);
    }));
    afterAll((done) => {
        app.lower(done);
    });
    it("find one with populates", () => __awaiter(this, void 0, void 0, function* () {
        const created = yield app.models[sails_fixture_app_1.model1Id].create({
            firstActive: new Date(dt1),
            isActive: false,
            num: 1,
            model3s: [{
                    title: "model3Title1",
                    model4s: [{
                            name: "model4Name1",
                        }],
                }],
            model2Field: {
                key: "key1",
                name: "model2Name1",
                model3s: [{
                        title: "model3Title2",
                    }],
                model4s: [{
                        name: "model4Name2",
                    }],
            },
        });
        const result = yield adapter.findOne(sails_fixture_app_1.model1Id, created.id, [
            {
                attribute: models.get(sails_fixture_app_1.model1Id).attributes.find((a) => a.name === "model2Field"), fields: [
                    {
                        attribute: models.get("model2").attributes.find((a) => a.name === "model3s"), fields: [
                            {
                                attribute: models.get("model3").attributes.find((a) => a.name === "model4s"),
                                fields: [],
                            },
                        ],
                    },
                    {
                        attribute: models.get("model2").attributes.find((a) => a.name === "model4s"), fields: [],
                    },
                ],
            },
            {
                attribute: models.get(sails_fixture_app_1.model1Id).attributes.find((a) => a.name === "model3s"), fields: [
                    { attribute: models.get("model3").attributes.find((a) => a.name === "model4s"), fields: [] },
                ],
            },
        ]);
        delete result.createdAt;
        delete result.updatedAt;
        delete result.model2Field.createdAt;
        delete result.model2Field.updatedAt;
        result.model2Field.model3s.map((m) => {
            delete m.createdAt;
            delete m.updatedAt;
            m.model4s.map((m4) => {
                delete m4.createdAt;
                delete m4.updatedAt;
            });
        });
        result.model2Field.model4s.map((m4) => {
            delete m4.createdAt;
            delete m4.updatedAt;
        });
        delete result.model3s.map((m) => {
            delete m.createdAt;
            delete m.updatedAt;
            m.model4s.map((m4) => {
                delete m4.createdAt;
                delete m4.updatedAt;
            });
        });
        expect(result).toMatchSnapshot();
    }));
    it("findCriteriaWhereToWhere", () => {
        const attr1 = {
            name: "attr1",
            type: graphql_models_1.AttributeTypes.String,
            required: false,
        };
        const attr2 = {
            name: "atrt2",
            type: graphql_models_1.AttributeTypes.Date,
            required: false,
        };
        expect(adapter_1.findCriteriaWhereToWhere({
            where: [{
                    attribute: attr1,
                    graphQLType: null,
                    name: "attr1Contains",
                    type: graphql_models_1.ArgumentTypes.Contains,
                    value: "v1",
                }, {
                    attribute: attr1,
                    graphQLType: null,
                    name: "attr1NotContains",
                    type: graphql_models_1.ArgumentTypes.NotContains,
                    value: "v3",
                }, {
                    attribute: attr2,
                    graphQLType: null,
                    name: "attr2GreaterThan",
                    type: graphql_models_1.ArgumentTypes.GreaterThan,
                    value: "v2",
                }],
        })).toMatchSnapshot();
    });
});
