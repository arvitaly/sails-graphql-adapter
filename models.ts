import { Attribute, AttributeType, AttributeTypes, Collection, Model, ModelConfig } from "graphql-models";
import Sails = require("sails");
import Waterline = require("waterline");
export default (sails: Sails.App, opts = { interfaces: [] }) => {
    return new Collection(getModels(sails), opts);
};
type AttributeCollectionType = "OneToMany" | "ManyToMany" | "ManyToManyDominant";
export function getModels(sails: Sails.App) {
    return Object.keys(sails.models).filter((modelName) => {
        return !!sails.models[modelName].globalId;
    }).map((modelName) => {
        const modelConfig: ModelConfig = {
            attributes: [],
            id: sails.models[modelName].globalId.toLowerCase(),
            name: sails.models[modelName].globalId,
        };
        Object.keys(sails.models[modelName].attributes).map((attrName) => {
            let type: AttributeType;
            let model: string;
            let primaryKey: boolean;
            let required: boolean;
            // let collectionType: AttributeCollectionType; ???
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
            const newAttr: Attribute = {
                name: attrName,
                realName: attrName,
                model,
                primaryKey,
                required,
                type,
            };
            modelConfig.attributes.push(newAttr);
        });
        return modelConfig;
    });
}
function sailsTypeTo(type: string): AttributeType {
    switch (type.toLowerCase()) {
        case "longtext":
        case "mediumtext":
        case "text":
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
        case "json":
            return AttributeTypes.JSON;
        default:
            throw new Error("Unknown sails type " + type);
    }
}
