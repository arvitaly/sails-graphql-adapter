"use strict";
const decapitalize_1 = require('./../utils/decapitalize');
const map_model_attribute_1 = require('./map-model-attribute');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sailsModel) => {
    let attributes = {};
    for (let attrName in sailsModel.attributes) {
        attributes[attrName] = map_model_attribute_1.default(sailsModel.attributes[attrName]);
    }
    const queryName = decapitalize_1.default(sailsModel.globalId);
    let model = {
        id: sailsModel.identity,
        name: sailsModel.globalId,
        queryName: queryName,
        pluralizeQueryName: queryName + "s",
        attributes: attributes
    };
    return model;
};
