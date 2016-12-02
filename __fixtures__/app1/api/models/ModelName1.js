"use strict";
module.exports = {
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
            required: true,
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
