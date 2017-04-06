"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_models_1 = require("graphql-models");
exports.default = (sails, opts = { interfaces: [] }) => {
    return new graphql_models_1.Collection(getModels(sails), opts);
};
function getModels(sails) {
    return Object.keys(sails.models).filter((modelName) => {
        return !!sails.models[modelName].globalId;
    }).map((modelName) => {
        const modelConfig = {
            attributes: [],
            id: sails.models[modelName].globalId.toLowerCase(),
            name: sails.models[modelName].globalId,
        };
        Object.keys(sails.models[modelName].attributes).map((attrName) => {
            let type;
            let model;
            let primaryKey;
            let required;
            // let collectionType: AttributeCollectionType; ???
            const attr = sails.models[modelName].attributes[attrName];
            if (typeof (attr) === "string") {
                type = sailsTypeTo(attr);
                required = false;
                primaryKey = false;
            }
            if (typeof (attr) === "object") {
                if (attr.type) {
                    type = sailsTypeTo(attr.type);
                }
                else {
                    if (attr.model) {
                        type = graphql_models_1.AttributeTypes.Model;
                        model = attr.model;
                    }
                    if (attr.collection) {
                        type = graphql_models_1.AttributeTypes.Collection;
                        model = attr.collection;
                    }
                }
                if (attr.required) {
                    required = attr.required;
                }
                else {
                    required = false;
                }
                if (attr.primaryKey) {
                    primaryKey = attr.primaryKey;
                }
                else {
                    primaryKey = false;
                }
            }
            const newAttr = {
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
exports.getModels = getModels;
function sailsTypeTo(type) {
    switch (type.toLowerCase()) {
        case "longtext":
        case "mediumtext":
        case "text":
        case "string":
            return graphql_models_1.AttributeTypes.String;
        case "integer":
            return graphql_models_1.AttributeTypes.Integer;
        case "float":
            return graphql_models_1.AttributeTypes.Float;
        case "boolean":
            return graphql_models_1.AttributeTypes.Boolean;
        case "date":
        case "datetime":
            return graphql_models_1.AttributeTypes.Date;
        case "json":
            return graphql_models_1.AttributeTypes.JSON;
        default:
            throw new Error("Unknown sails type " + type);
    }
}
