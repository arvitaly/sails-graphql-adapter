"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const graphql_1 = require('graphql');
const capitalize_1 = require('./capitalize');
const attribute_type_1 = require('./attribute-type');
const map_model_attributes_1 = require('./map-model-attributes');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (modelName, model, generator) => {
    let fields = {};
    map_model_attributes_1.default(model._attributes).map(({ name, type, graphqlType, attribute }) => {
        if (graphqlType !== null) {
            fields[name] = {
                args: {},
                type: graphqlType,
                deprecationReason: "",
                description: name
            };
        }
        else {
            switch (type) {
                case attribute_type_1.default.Model:
                    let childModelName = attribute.model;
                    fields[name] = {
                        args: {},
                        type: generator.getType(childModelName),
                        deprecationReason: "",
                        description: name,
                        resolve: (parent, b, c) => __awaiter(this, void 0, void 0, function* () {
                            return (yield generator.models[childModelName].findById(parent[name]))[0];
                        })
                    };
                    break;
            }
        }
    });
    return new graphql_1.GraphQLObjectType({
        name: capitalize_1.default(modelName),
        description: modelName,
        fields: fields,
        interfaces: []
    });
};
