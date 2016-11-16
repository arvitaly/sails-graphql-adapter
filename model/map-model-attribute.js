"use strict";
const attribute_type_1 = require('./attribute-type');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (name, attr) => {
    let type = "", outType, model = "";
    if (typeof (attr) === "string") {
        type = attr;
    }
    else {
        type = attr.type;
    }
    switch (("" + type).toLowerCase()) {
        case "string":
            outType = attribute_type_1.default.String;
            break;
        case "integer":
        case "int":
            outType = attribute_type_1.default.Integer;
            break;
        case "datetime":
            outType = attribute_type_1.default.Datetime;
            break;
    }
    if (attr['model']) {
        outType = attribute_type_1.default.Model;
        model = attr.model.toLowerCase();
    }
    if (attr['collection']) {
        outType = attribute_type_1.default.Collection;
    }
    if (!outType) {
        outType = attribute_type_1.default.String;
    }
    return {
        name: name,
        model: model,
        type: outType
    };
};
