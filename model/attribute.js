"use strict";
const capitalize_1 = require("./../utils/capitalize");
const attribute_type_1 = require("./attribute-type");
class Attribute {
    constructor(name, attr) {
        let type = "";
        let outType = null;
        let model = "";
        if (typeof (attr) === "string") {
            type = attr;
        }
        else {
            type = attr.type;
        }
        switch (("" + type).toLowerCase()) {
            case "boolean":
                outType = attribute_type_1.default.Boolean;
                break;
            case "email":
            case "mediumtext":
            case "longtext":
            case "json":
            case "string":
                outType = attribute_type_1.default.String;
                break;
            case "integer":
            case "int":
                outType = attribute_type_1.default.Integer;
                break;
            case "float":
                outType = attribute_type_1.default.Float;
                break;
            case "date":
                outType = attribute_type_1.default.Date;
                break;
            case "datetime":
                outType = attribute_type_1.default.Datetime;
                break;
            default:
        }
        if (attr.model) {
            outType = attribute_type_1.default.Model;
            model = attr.model.toLowerCase();
        }
        if (attr.collection) {
            outType = attribute_type_1.default.Collection;
            model = attr.collection.toLowerCase();
        }
        if (outType === null) {
            throw new Error("Unknown sails type for attribute " + JSON.stringify(attr));
        }
        this.isRequired = attr.required === true;
        this.model = model;
        this.name = name;
        this.capitalizeName = capitalize_1.default(name);
        this.type = outType;
        if (attr.primaryKey === true) {
            this.isPrimaryKey = true;
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Attribute;
