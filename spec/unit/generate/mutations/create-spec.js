"use strict";
const create_1 = require("./../../../../generate/mutations/create");
const generator1_1 = require("./../../../fixtures/generator1");
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
describe("Generate CreateMutation spec", () => {
    it("", () => {
        const expected = [{
                field: graphql_relay_1.mutationWithClientMutationId({
                    inputFields: {
                        createModel2Field: { type: generator1_1.default.getCreateType("model2") },
                        firstActive: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                        id: { type: graphql_1.GraphQLInt },
                        isActive: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
                        lastActive: { type: graphql_1.GraphQLString },
                        model2Field: { type: graphql_1.GraphQLString },
                        name: { type: graphql_1.GraphQLString },
                        num: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                        sum: { type: graphql_1.GraphQLFloat },
                        title: { type: graphql_1.GraphQLString },
                    },
                    mutateAndGetPayload: jasmine.any(Function),
                    name: "CreateModelName1Mutation",
                    outputFields: {
                        modelName1: {
                            type: generator1_1.default.getType("modelname1"),
                        },
                    },
                }),
                name: "createModelName1",
            }];
        const result = create_1.default("modelname1", generator1_1.default);
        expect(result[0].name).toBe(expected[0].name);
        /* tslint:disable:no-string-literal */
        expect(result[0].field.type["name"]).toBe(expected[0].field.type["name"]);
        // Check output payload fields
        expect(result[0].field.type["_typeConfig"].fields()).toEqual(expected[0].field.type["_typeConfig"].fields());
        // Check input fields        
        expect(result[0].field.args["input"].type["ofType"]._typeConfig.fields()).
            toEqual(expected[0].field.args["input"].type["ofType"]._typeConfig.fields());
    });
});
