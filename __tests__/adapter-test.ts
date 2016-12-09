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
    beforeEach(async () => {
        app = await start(__dirname + "/../__fixtures__/app1");
        models = convert(app);
        adapter = new Adapter(app, models);
    });
    afterEach((done) => {
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
