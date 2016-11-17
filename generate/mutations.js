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
const attribute_type_1 = require('./../model/attribute-type');
const capitalize_1 = require('./../utils/capitalize');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (id, generator) => {
    const model = generator.getModel(id);
    const modelType = generator.getType(model.id);
    let mutations = [];
    const updateMutationName = "MutationUpdate" + capitalize_1.default(model.name);
    let updateMutationInputFields = {
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        }
    };
    let updateMutationOutputFields = {};
    model.mapAttributes((attr) => {
        let fields = {};
        switch (attr.type) {
            case attribute_type_1.default.String:
                fields[attr.name] = { type: graphql_1.GraphQLString };
                break;
            case attribute_type_1.default.Integer:
                fields[attr.name] = { type: graphql_1.GraphQLInt };
                break;
            case attribute_type_1.default.Float:
                fields[attr.name] = { type: graphql_1.GraphQLFloat };
                break;
        }
        updateMutationInputFields["set" + capitalize_1.default(attr.name)] = {
            type: new graphql_1.GraphQLInputObjectType({
                name: updateMutationName + "Set" + capitalize_1.default(name),
                description: model.name,
                fields: fields
            })
        };
    });
    updateMutationOutputFields[model.queryName] = {
        type: modelType
    };
    const updateMutation = graphql_relay_1.mutationWithClientMutationId({
        inputFields: updateMutationInputFields,
        mutateAndGetPayload: (args) => __awaiter(this, void 0, void 0, function* () {
            /*let outputModel = {};
            mapAttrs(model._attributes).map(({name, type, graphqlType}) => {
                const setName = "set" + capitalize(name);
                if (typeof (args[setName]) !== "undefined") {
                    outputModel[name] = args[setName][name];
                }
            })
            const results = await model.update({ where: { id: args.id } }, outputModel);
            let ret = { clientMutationId: args.clientMutationId };
            ret[modelName] = results[0];
            return ret;*/
        }),
        name: updateMutationName,
        outputFields: updateMutationOutputFields
    });
    mutations.push({
        name: "update" + capitalize_1.default(model.name),
        field: updateMutation
    });
    updateMutation.type;
    return mutations;
};
