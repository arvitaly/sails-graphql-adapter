"use strict";
const attribute_type_1 = require("./../../model/attribute-type");
const boolean_1 = require("./boolean");
const date_1 = require("./date");
const datetime_1 = require("./datetime");
const float_1 = require("./float");
const integer_1 = require("./integer");
const string_1 = require("./string");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (argName, type) => {
    let argsA = [];
    switch (type) {
        case attribute_type_1.default.Boolean:
            argsA = argsA.concat(boolean_1.default(argName));
            break;
        case attribute_type_1.default.String:
            argsA = argsA.concat(string_1.default(argName));
            break;
        case attribute_type_1.default.Integer:
            argsA = argsA.concat(integer_1.default(argName));
            break;
        case attribute_type_1.default.Float:
            argsA = argsA.concat(float_1.default(argName));
            break;
        case attribute_type_1.default.Date:
            argsA = argsA.concat(date_1.default(argName));
            break;
        case attribute_type_1.default.Datetime:
            argsA = argsA.concat(datetime_1.default(argName));
            break;
        default:
            throw new Error("Invalid scalar attr type " + attribute_type_1.default[type]);
    }
    return argsA;
};
