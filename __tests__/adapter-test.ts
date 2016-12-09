import { ArgumentTypes, AttributeTypes, Collection } from "graphql-models";
import Sails = require("sails");
import { createModel1, model1Id, start } from "sails-fixture-app";
import Adapter, { findCriteriaWhereToWhere } from "./../adapter";
import convert from "./../models";
const dt1 = "2016-11-18T11:25:11.000Z";
describe("Adapter test", () => {
    let app: Sails.App;
    let adapter: Adapter;
    let models: Collection;
    beforeAll(async () => {
        app = await start(__dirname + "/../__fixtures__/app1");
        models = convert(app);
        adapter = new Adapter(app, models);
    });
    afterAll((done) => {
        app.lower(done);
    });
    it("find one with populates", async () => {
        const created = await app.models[model1Id].create({
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
        const result = await adapter.findOne(model1Id, created.id, [
            {
                attribute: models.get(model1Id).attributes.find((a) => a.name === "model2Field"), fields: [
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
                attribute: models.get(model1Id).attributes.find((a) => a.name === "model3s"), fields: [
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
        delete result.model3s.map((m) => {
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
    });
    it("find with null submodel", async () => {
        const created = await app.models[model1Id].create({
            firstActive: new Date(dt1),
            isActive: false,
            num: 1,
        });
        const result = await adapter.findOne(model1Id, created.id, [
            { attribute: models.get(model1Id).attributes.find((a) => a.name === "model2Field"), fields: [] }]);
        delete result.createdAt;
        delete result.updatedAt;
        expect(result).toMatchSnapshot();
    });
    it("find many", async () => {
        const createds = await app.models[model1Id].create([{
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
        const result = await adapter.findMany(model1Id, {
            where: [{
                attribute: models.get(model1Id).attributes.find((a) => a.name === "num"),
                graphQLType: null,
                name: "numGreaterThan",
                type: ArgumentTypes.GreaterThan,
                value: 1000,
            }],
        }, [
                {
                    attribute: models.get(model1Id).attributes.find((a) => a.name === "model3s"), fields: [
                        {
                            attribute: models.get("model3").attributes.find((a) => a.name === "model4s"), fields: [
                                {
                                    attribute: models.get("model4").attributes.find((a) => a.name === "model5Field"),
                                    fields: [],
                                },
                            ],
                        },
                    ],
                }]);
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
    });
    it("findCriteriaWhereToWhere", () => {
        const attr1 = {
            name: "attr1",
            type: AttributeTypes.String,
            required: false,
        };
        const attr2 = {
            name: "atrt2",
            type: AttributeTypes.Date,
            required: false,
        };
        expect(findCriteriaWhereToWhere({
            where: [{
                attribute: attr1,
                graphQLType: null,
                name: "attr1Contains",
                type: ArgumentTypes.Contains,
                value: "v1",
            }, {
                attribute: attr1,
                graphQLType: null,
                name: "attr1NotContains",
                type: ArgumentTypes.NotContains,
                value: "v3",
            }, {
                attribute: attr2,
                graphQLType: null,
                name: "attr2GreaterThan",
                type: ArgumentTypes.GreaterThan,
                value: "v2",
            }],
        })).toMatchSnapshot();
    });
});
