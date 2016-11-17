"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    globalId: "ModelName1",
    identity: "modelname1",
    attributes: {
        id: {
            type: "integer",
            primaryKey: true,
        },
        name: "string",
        title: {
            type: "string",
        },
        num: {
            type: "integer",
            required: true,
        },
        sum: {
            type: "float",
        },
        isActive: {
            type: "boolean",
            required: true
        },
        firstActive: {
            type: "Date",
            required: true,
        },
        lastActive: {
            type: "DateTime",
        },
        model2Field: {
            model: "model2",
        },
    },
};
