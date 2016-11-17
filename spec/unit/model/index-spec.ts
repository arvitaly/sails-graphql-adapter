import convertModel, { Model } from "./../../../model";
import AttributeType from "./../../../model/attribute-type";
import { default as sailsModel } from "./../../fixtures/model1";
describe("Adapter model spec", () => {
    it("when created, should convert all attributes", () => {
        const model = convertModel(sailsModel as any);
        expect(model).toEqual(new Model(sailsModel as any));
        expect(model.id).toBe(sailsModel.identity);
        expect(model.name).toBe("ModelName1");
        expect(model.pluralizeQueryName).toBe("modelName1s");
        expect(model.queryName).toBe("modelName1");
        expect(model.attributes).toEqual({
            firstActive: {
                isRequired: true,
                model: "",
                name: "firstActive",
                type: AttributeType.Date,
            },
            id: {
                isPrimaryKey: true,
                isRequired: false,
                model: "",
                name: "id",
                type: AttributeType.Integer,
            },
            isActive: {
                isRequired: true,
                model: "",
                name: "isActive",
                type: AttributeType.Boolean,
            },
            lastActive: {
                isRequired: false,
                model: "",
                name: "lastActive",
                type: AttributeType.Datetime,
            },
            model2Field: {
                isRequired: false,
                model: "model2",
                name: "model2Field",
                type: AttributeType.Model,
            },
            name: {
                isRequired: false,
                model: "",
                name: "name",
                type: AttributeType.String,
            },
            num: {
                isRequired: true,
                model: "",
                name: "num",
                type: AttributeType.Integer,
            },
            sum: {
                isRequired: false,
                model: "",
                name: "sum",
                type: AttributeType.Float,
            },
            title: {
                isRequired: false,
                model: "",
                name: "title",
                type: AttributeType.String,
            },
        });
        let count = 0;
        model.mapAttributes((attr) => {
            count++;
        });
        expect(count).toBe(9);
        expect(model.getNameWithPostfix("Test")).toBe("ModelName1Test");
        expect(model.getNameWithPrefix("Test")).toBe("TestModelName1");
    });
});
