"use strict";
const model_1 = require("./../../../model");
const attribute_type_1 = require("./../../../model/attribute-type");
describe("Adapter model spec", () => {
    it("when created, should convert all attributes", () => {
        const sailsModel = {
            attributes: {
                name: "string",
                num: "integer",
                sum: "float",
            },
            globalId: "Model1",
            identity: "model1",
        };
        const model = model_1.default(sailsModel);
        expect(model).toEqual(new model_1.Model(sailsModel));
        expect(model.id).toBe(sailsModel.identity);
        expect(model.name).toBe("Model1");
        expect(model.pluralizeQueryName).toBe("model1s");
        expect(model.queryName).toBe("model1");
        expect(model.attributes).toEqual({
            name: {
                isRequired: false,
                model: "",
                name: "name",
                type: attribute_type_1.default.String,
            },
            num: {
                isRequired: false,
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
        });
        let count = 0;
        model.mapAttributes((attr) => {
            count++;
        });
        expect(count).toBe(3);
        expect(model.getNameWithPostfix("Test")).toBe("Model1Test");
        expect(model.getNameWithPrefix("Test")).toBe("TestModel1");
    });
});
