"use strict";
const generateCreateParams = (modelId, createParams, models) => {
    const model = models[modelId];
    let created = Object.assign({}, createParams);
    model.attributes.map((attr) => {
        if (typeof (createParams["create" + attr.capitalizeName]) !== "undefined") {
            created[attr.name] = generateCreateParams(attr.model, createParams["create" + attr.capitalizeName], models);
            delete created["create" + attr.capitalizeName];
        }
    });
    return created;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateCreateParams;
