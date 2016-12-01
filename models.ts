import { Attribute, AttributeType, AttributeTypes, Model, ModelConfig } from "graphql-models";
import Sails = require("sails");
import Waterline = require("waterline");
export default (sails: Sails.App) => {
    return Object.keys(sails.models).map((modelName) => {
        let modelConfig: ModelConfig = {
            attributes: [],
            id: sails.models[modelName].globalId.toLowerCase(),
            name: sails.models[modelName].globalId,
        };
        Object.keys(sails.models[modelName].attributes).map((attrName) => {
            let type: AttributeType;
            let model: string;
            let primaryKey: boolean;
            let required: boolean;
            const attr = sails.models[modelName].attributes[attrName] as Sails.Attribute;
            if (typeof (attr) === "string") {
                type = sailsTypeTo(attr);
                required = false;
                primaryKey = false;
            }
            if (typeof (attr) === "object") {
                if (attr.type) {
                    type = sailsTypeTo(attr.type);
                } else {
                    if ((attr as Waterline.OneToOneAttribute).model) {
                        type = AttributeTypes.Model;
                        model = (attr as Waterline.OneToOneAttribute).model;
                    }
                    if ((attr as Waterline.OneToManyAttribute).collection) {
                        type = AttributeTypes.Collection;
                        model = (attr as Waterline.OneToManyAttribute).collection;
                    }
                }
                if (attr.required) {
                    required = attr.required;
                } else {
                    required = false;
                }
                if (attr.primaryKey) {
                    primaryKey = attr.primaryKey;
                } else {
                    primaryKey = false;
                }
            }
            modelConfig.attributes.push({
                name: attrName,
                model,
                primaryKey,
                required,
                type,
            });
        });
        return modelConfig;
    });
};
function sailsTypeTo(type: string): AttributeType {
    switch (type.toLowerCase()) {
        case "string":
            return AttributeTypes.String;
        case "integer":
            return AttributeTypes.Integer;
        case "float":
            return AttributeTypes.Float;
        case "boolean":
            return AttributeTypes.Boolean;
        case "date":
        case "datetime":
            return AttributeTypes.Date;
        default:
            throw new Error("Unknown sails type " + type);
    }
}
