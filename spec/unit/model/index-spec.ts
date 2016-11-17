import convertModel, { Model } from "./../../../model";
import AttributeType from "./../../../model/attribute-type";
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
        const model = convertModel(sailsModel as any);
        expect(model).toEqual(new Model(sailsModel as any));
        expect(model.id).toBe(sailsModel.identity);
        expect(model.name).toBe("Model1");
        expect(model.pluralizeQueryName).toBe("model1s");
        expect(model.queryName).toBe("model1");
        expect(model.attributes).toEqual({
            name: {
                isRequired: false,
                model: "",
                name: "name",
                type: AttributeType.String,
            },
            num: {
                isRequired: false,
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
