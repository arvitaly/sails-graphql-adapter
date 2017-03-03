"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_models_1 = require("graphql-models");
exports.default = [
    {
        attributes: [
            {
                model: undefined,
                name: "name",
                primaryKey: false,
                required: false,
                type: graphql_models_1.AttributeTypes.String,
            },
            {
                model: undefined,
                name: "key",
                primaryKey: true,
                required: false,
                type: graphql_models_1.AttributeTypes.String,
            },
            {
                model: undefined,
                name: "createdAt",
                primaryKey: false,
                required: false,
                type: graphql_models_1.AttributeTypes.Date,
            },
            {
                model: undefined,
                name: "updatedAt",
                primaryKey: false,
                required: false,
                type: graphql_models_1.AttributeTypes.Date,
            },
        ],
        id: "model2",
        name: "Model2",
    },
    {
        attributes: [
            {
                model: undefined,
                name: "id",
                primaryKey: true,
                required: false,
                type: graphql_models_1.AttributeTypes.Integer,
            },
            {
                model: undefined,
                name: "name",
                primaryKey: false,
                required: false,
                type: graphql_models_1.AttributeTypes.String,
            },
            {
                model: undefined,
                name: "title",
                primaryKey: false,
                required: false,
                type: graphql_models_1.AttributeTypes.String,
            },
            {
                model: undefined,
                name: "num",
                primaryKey: false,
                required: true,
                type: graphql_models_1.AttributeTypes.Integer,
            },
            {
                model: undefined,
                name: "sum",
                primaryKey: false,
                required: false,
                type: graphql_models_1.AttributeTypes.Float,
            },
            {
                model: undefined,
                name: "isActive",
                primaryKey: false,
                required: true,
                type: graphql_models_1.AttributeTypes.Boolean,
            },
            {
                model: undefined,
                name: "firstActive",
                primaryKey: false,
                required: true,
                type: graphql_models_1.AttributeTypes.Date,
            },
            {
                model: undefined,
                name: "lastActive",
                primaryKey: false,
                required: false,
                type: graphql_models_1.AttributeTypes.Date,
            },
            {
                model: "model2",
                name: "model2Field",
                primaryKey: false,
                required: false,
                type: graphql_models_1.AttributeTypes.Model,
            },
            {
                model: undefined,
                name: "createdAt",
                primaryKey: false,
                required: false,
                type: graphql_models_1.AttributeTypes.Date,
            },
            {
                model: undefined,
                name: "updatedAt",
                primaryKey: false,
                required: false,
                type: graphql_models_1.AttributeTypes.Date,
            },
        ],
        id: "modelname1",
        name: "ModelName1",
    },
];
