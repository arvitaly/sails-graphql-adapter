"use strict";
var AttributeType;
(function (AttributeType) {
    AttributeType[AttributeType["String"] = 0] = "String";
    AttributeType[AttributeType["Integer"] = 1] = "Integer";
    AttributeType[AttributeType["Float"] = 2] = "Float";
    AttributeType[AttributeType["Datetime"] = 3] = "Datetime";
    AttributeType[AttributeType["Model"] = 4] = "Model";
    AttributeType[AttributeType["Collection"] = 5] = "Collection";
})(AttributeType || (AttributeType = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AttributeType;
