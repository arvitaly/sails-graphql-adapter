"use strict";
const capitalize_1 = require("./../utils/capitalize");
const decapitalize_1 = require("./../utils/decapitalize");
const attribute_1 = require("./attribute");
const field_1 = require("./field");
class Model {
    constructor(sailsModel) {
        this.attributes = [];
        this.fields = [];
        for (let attrName in sailsModel.attributes) {
            let attr = new attribute_1.default(attrName, sailsModel.attributes[attrName]);
            this.attributes.push(attr);
            if (attr.isPrimaryKey) {
                this.primary = attr;
            }
        }
        this.queryName = decapitalize_1.default(sailsModel.globalId);
        this.id = sailsModel.identity;
        this.name = sailsModel.globalId;
        this.pluralizeQueryName = this.queryName + "s";
        this.fields = this.attributes.map((attr) => {
            const field = new field_1.default();
            field.name = attr.name;
            field.isPrimaryKey = attr.isPrimaryKey;
            field.isRequired = attr.isRequired;
            field.type = attr.type;
            return field;
        });
    }
    getAttribute(name) {
        return this.attributes.filter(a => a.name === name)[0];
    }
    getNameWithPrefix(prefix) {
        return prefix + capitalize_1.default(this.name);
    }
    getNameWithPostfix(postfix) {
        return this.name + postfix;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Model;
