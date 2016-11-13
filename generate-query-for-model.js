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
const generate_args_for_model_1 = require('./generate-args-for-model');
function generateQueryForModel(name, model) {
    let fields = {};
    for (let attrName in model._attributes) {
        let attr = model._attributes[attrName];
        let type;
        if (typeof (attr) === "string") {
            type = attr;
        }
        else {
            type = attr.type;
        }
        switch (type) {
            case "string":
                fields[attrName] = {
                    args: {},
                    type: graphql_1.GraphQLString,
                    deprecationReason: "",
                    description: attrName
                };
        }
    }
    const modelType = new graphql_1.GraphQLObjectType({
        name: name.charAt(0).toUpperCase() + name.substr(1),
        description: name,
        fields: fields,
        interfaces: []
    });
    return [{
            name: name,
            field: {
                args: generate_args_for_model_1.default(model),
                description: name,
                deprecationReason: "",
                resolve: (parent, args, context) => __awaiter(this, void 0, void 0, function* () {
                    return (yield model.find({ limit: 1 }))[0];
                }),
                type: modelType
            }
        }, {
            name: name + "s",
            field: {
                args: generate_args_for_model_1.default(model),
                description: name,
                deprecationReason: "",
                resolve: (parent, args, context) => __awaiter(this, void 0, void 0, function* () {
                    return (yield model.find({}));
                }),
                type: new graphql_1.GraphQLList(modelType)
            }
        }];
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateQueryForModel;
