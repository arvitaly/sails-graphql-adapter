"use strict";
var AttributeType;
(function (AttributeType) {
    AttributeType[AttributeType["String"] = 0] = "String";
    AttributeType[AttributeType["Integer"] = 1] = "Integer";
    AttributeType[AttributeType["Float"] = 2] = "Float";
    AttributeType[AttributeType["Boolean"] = 3] = "Boolean";
    AttributeType[AttributeType["Date"] = 4] = "Date";
    AttributeType[AttributeType["Datetime"] = 5] = "Datetime";
    AttributeType[AttributeType["Binary"] = 6] = "Binary";
    AttributeType[AttributeType["Model"] = 7] = "Model";
    AttributeType[AttributeType["Collection"] = 8] = "Collection";
})(AttributeType || (AttributeType = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AttributeType;
