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
const graphql_relay_1 = require('graphql-relay');
const capitalize_1 = require('./../utils/capitalize');
const map_model_attributes_1 = require('./map-model-attributes');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (model, generator) => {
    const modelType = generator.getType(model.identity);
    let mutations = [];
    const updateMutationName = "MutationUpdate" + capitalize_1.default(modelName);
    let updateMutationInputFields = {
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        }
    };
    let updateMutationOutputFields = {};
    map_model_attributes_1.default(model._attributes).map(({ name, type, graphqlType }) => {
        if (!graphqlType) {
            return;
        }
        let fields = {};
        fields[name] = {
            type: graphqlType
        };
        updateMutationInputFields["set" + capitalize_1.default(name)] = {
            type: new graphql_1.GraphQLInputObjectType({
                name: updateMutationName + "Set" + capitalize_1.default(name),
                description: modelName,
                fields: fields
            })
        };
    });
    updateMutationOutputFields[modelName] = {
        type: modelType
    };
    const updateMutation = graphql_relay_1.mutationWithClientMutationId({
        inputFields: updateMutationInputFields,
        mutateAndGetPayload: (args) => __awaiter(this, void 0, void 0, function* () {
            let outputModel = {};
            map_model_attributes_1.default(model._attributes).map(({ name, type, graphqlType }) => {
                const setName = "set" + capitalize_1.default(name);
                if (typeof (args[setName]) !== "undefined") {
                    outputModel[name] = args[setName][name];
                }
            });
            const results = yield model.update({ where: { id: args.id } }, outputModel);
            let ret = { clientMutationId: args.clientMutationId };
            ret[modelName] = results[0];
            return ret;
        }),
        name: updateMutationName,
        outputFields: updateMutationOutputFields
    });
    mutations.push({
        name: "update" + capitalize_1.default(modelName),
        field: updateMutation
    });
    return mutations;
};
