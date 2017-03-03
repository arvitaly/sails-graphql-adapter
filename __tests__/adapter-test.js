"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_models_1 = require("graphql-models");
const sails_fixture_app_1 = require("sails-fixture-app");
const start_1 = require("sails-fixture-app/start");
const adapter_1 = require("./../adapter");
const models_1 = require("./../models");
const dt1 = "2016-11-18T11:25:11.000Z";
describe("Adapter test", () => {
    let app;
    let adapter;
    let models;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        app = yield start_1.default();
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
                            model5Field: {
                                name: "model5Name1",
                            },
                        }],
                }],
            model2Field: {
                key: "key1",
                name: "model2Name1",
                model3s: [{
                        title: "model3Title2",
                        model4s: [{
                                name: "model4Name5",
                            }],
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
                    {
                        attribute: models.get("model3").attributes.find((a) => a.name === "model4s"), fields: [
                            {
                                attribute: models.get("model4").attributes.find((a) => a.name === "model5Field"),
                                fields: [],
                            },
                        ],
                    },
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
        result.model3s.map((m) => {
            delete m.createdAt;
            delete m.updatedAt;
            m.model4s.map((m4) => {
                delete m4.createdAt;
                delete m4.updatedAt;
                delete m4.model5Field.createdAt;
                delete m4.model5Field.updatedAt;
            });
        });
        expect(result).toMatchSnapshot();
    }));
    it("find with null submodel", () => __awaiter(this, void 0, void 0, function* () {
        const created = yield app.models[sails_fixture_app_1.model1Id].create({
            firstActive: new Date(dt1),
            isActive: false,
            num: 1,
        });
        const result = yield adapter.findOne(sails_fixture_app_1.model1Id, created.id, [
            { attribute: models.get(sails_fixture_app_1.model1Id).attributes.find((a) => a.name === "model2Field"), fields: [] }
        ]);
        delete result.createdAt;
        delete result.updatedAt;
        expect(result).toMatchSnapshot();
    }));
    it("find many", () => __awaiter(this, void 0, void 0, function* () {
        const createds = yield app.models[sails_fixture_app_1.model1Id].create([{
                firstActive: new Date(dt1),
                isActive: false,
                num: 1001,
                model3s: [{
                        title: "model3Title1",
                        model4s: [{
                                name: "model4Name1",
                                model5Field: {
                                    name: "model5Name1",
                                },
                            }],
                    }],
            }]);
        const result = yield adapter.findMany(sails_fixture_app_1.model1Id, {
            where: [{
                    attribute: models.get(sails_fixture_app_1.model1Id).attributes.find((a) => a.name === "num"),
                    graphQLType: null,
                    name: "numGreaterThan",
                    type: graphql_models_1.ArgumentTypes.GreaterThan,
                    value: 1000,
                }],
        }, [
            {
                attribute: models.get(sails_fixture_app_1.model1Id).attributes.find((a) => a.name === "model3s"), fields: [
                    {
                        attribute: models.get("model3").attributes.find((a) => a.name === "model4s"), fields: [
                            {
                                attribute: models.get("model4").attributes.find((a) => a.name === "model5Field"),
                                fields: [],
                            },
                        ],
                    },
                ],
            }
        ]);
        result.map((model1) => {
            delete model1.createdAt;
            delete model1.updatedAt;
            model1.model3s.map((model3) => {
                delete model3.createdAt;
                delete model3.updatedAt;
                model3.model4s.map((model4) => {
                    delete model4.createdAt;
                    delete model4.updatedAt;
                    delete model4.model5Field.createdAt;
                    delete model4.model5Field.updatedAt;
                });
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
