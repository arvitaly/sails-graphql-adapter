"use strict";
const capitalize_1 = require("./../utils/capitalize");
const decapitalize_1 = require("./../utils/decapitalize");
const map_model_attribute_1 = require("./map-model-attribute");
class Model {
    constructor(sailsModel) {
        this.attributes = {};
        this.attrsArray = [];
        for (let attrName in sailsModel.attributes) {
            this.attributes[attrName] = map_model_attribute_1.default(attrName, sailsModel.attributes[attrName]);
            this.attrsArray.push(this.attributes[attrName]);
            if (this.attributes[attrName].isPrimaryKey) {
                this.primaryAttribute = this.attributes[attrName];
            }
        }
        if (!this.primaryAttribute) {
            // tslint:disable:no-string-literal
            this.primaryAttribute = this.attributes["id"];
        }
        this.queryName = decapitalize_1.default(sailsModel.globalId);
        this.id = sailsModel.identity;
        this.name = sailsModel.globalId;
        this.pluralizeQueryName = this.queryName + "s";
    }
    getPrimaryAttribute() {
        return this.primaryAttribute;
    }
    getNameWithPrefix(prefix) {
        return prefix + capitalize_1.default(this.name);
    }
    getNameWithPostfix(postfix) {
        return this.name + postfix;
    }
    mapAttributes(cb) {
        return this.attrsArray.map(cb);
    }
}
exports.Model = Model;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sailsModel) => {
    return new Model(sailsModel);
};
