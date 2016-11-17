"use strict";
const attribute_type_1 = require("./../model/attribute-type");
const for_scalar_type_1 = require("./query-args/for-scalar-type");
const model_1 = require("./query-args/model");
function default_1(id, generator) {
    const model = generator.getModel(id);
    let argsA = [];
    model.mapAttributes((attr) => {
        if (attr.type === attribute_type_1.default.Model) {
            argsA = argsA.concat(model_1.default(attr, generator));
        }
        else {
            argsA = argsA.concat(for_scalar_type_1.default(attr.name, attr.type));
        }
    });
    let args = {};
    argsA.map((arg) => {
        args[arg.name] = arg.field;
    });
    return args;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
