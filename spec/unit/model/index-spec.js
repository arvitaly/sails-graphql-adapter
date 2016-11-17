"use strict";
const model_1 = require("./../../../model");
const attribute_type_1 = require("./../../../model/attribute-type");
const model_2 = require("./../../../model/model");
const model1_1 = require("./../../fixtures/model1");
describe("Adapter model spec", () => {
    it("when created, should convert all attributes", () => {
        const model = model_1.default(model1_1.default);
        expect(model).toEqual(new model_2.default(model1_1.default));
        expect(model.id).toBe(model1_1.default.identity);
        expect(model.name).toBe("ModelName1");
        expect(model.pluralizeQueryName).toBe("modelName1s");
        expect(model.queryName).toBe("modelName1");
        const expected = {
            firstActive: {
                isRequired: true,
                model: "",
                name: "firstActive",
                type: attribute_type_1.default.Date,
            },
            id: {
                isPrimaryKey: true,
                isRequired: false,
                model: "",
                name: "id",
                type: attribute_type_1.default.Integer,
            },
            isActive: {
                isRequired: true,
                model: "",
                name: "isActive",
                type: attribute_type_1.default.Boolean,
            },
            lastActive: {
                isRequired: false,
                model: "",
                name: "lastActive",
                type: attribute_type_1.default.Datetime,
            },
            model2Field: {
                isRequired: false,
                model: "model2",
                name: "model2Field",
                type: attribute_type_1.default.Model,
            },
            name: {
                isRequired: false,
                model: "",
                name: "name",
                type: attribute_type_1.default.String,
            },
            num: {
                isRequired: true,
                model: "",
                name: "num",
                type: attribute_type_1.default.Integer,
            },
            sum: {
                isRequired: false,
                model: "",
                name: "sum",
                type: attribute_type_1.default.Float,
            },
            title: {
                isRequired: false,
                model: "",
                name: "title",
                type: attribute_type_1.default.String,
            },
        };
        expect(model.attributes.length).toBe(9);
        model.attributes.map((attr) => {
            expect(attr).toEqual(jasmine.objectContaining(expected[attr.name]));
        });
        expect(model.getNameWithPostfix("Test")).toBe("ModelName1Test");
        expect(model.getNameWithPrefix("Test")).toBe("TestModelName1");
    });
});
