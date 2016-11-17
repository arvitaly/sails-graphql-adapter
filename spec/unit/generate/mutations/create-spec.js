"use strict";
const generator_1 = require("./../../../../generate/generator");
const create_1 = require("./../../../../generate/mutations/create");
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
describe("Generate CreateMutation spec", () => {
    it("", () => {
        const generator = new generator_1.default({
            models: {
                model1: {
                    attributes: {
                        name: "string",
                        num: {
                            type: "integer",
                        },
                    },
                    globalId: "Model1",
                    identity: "model1",
                },
            },
        });
        const expected = [{
                field: graphql_relay_1.mutationWithClientMutationId({
                    inputFields: {
                        name: {
                            type: graphql_1.GraphQLString,
                        },
                        num: {
                            type: graphql_1.GraphQLInt,
                        },
                    },
                    mutateAndGetPayload: jasmine.any(Function),
                    name: "CreateModel1Mutation",
                    outputFields: {
                        model1: {
                            type: generator.getType("model1"),
                        },
                    },
                }),
                name: "createModel1",
            }];
        const result = create_1.default("model1", generator);
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
