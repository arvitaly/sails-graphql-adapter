"use strict";
const generator_1 = require("./../../../generate/generator");
const type_1 = require("./../../../generate/type");
const type_2 = require("./../../../resolve/type");
const graphql_1 = require("graphql");
describe("Generate graphql type for model spec", () => {
    it("when created, should return GraphQLObject", () => {
        const model1 = {
            attributes: {
                firstActive: "date",
                lastActive: "datetime",
                model2: {
                    model: "model2"
                },
                name: "string",
                num: "integer",
                sum: "float",
                title: { type: "string" },
            },
            globalId: "Model1",
            identity: "model1",
        };
        const model2 = {
            attributes: {
                name: "string"
            },
            globalId: "Model2",
            identity: "model2",
        };
        const generator = new generator_1.default({ models: { model1, model2 } });
        spyOn(generator.resolver, "resolve");
        const expected = new graphql_1.GraphQLObjectType({
            description: "Model1",
            fields: {
                firstActive: { type: graphql_1.GraphQLString },
                lastActive: { type: graphql_1.GraphQLString },
                model2: {
                    resolve: jasmine.any(Function),
                    type: new graphql_1.GraphQLObjectType({
                        description: "Model2",
                        fields: {
                            name: { type: graphql_1.GraphQLString },
                        },
                        interfaces: [],
                        name: "Model2",
                    }),
                },
                name: { type: graphql_1.GraphQLString },
                num: { type: graphql_1.GraphQLInt },
                sum: { type: graphql_1.GraphQLFloat },
                title: { type: graphql_1.GraphQLString },
            },
            interfaces: [],
            name: "Model1",
        });
        const result = type_1.default("model1", generator);
        expect(result).toEqual(expected);
        // tslint:disable:no-string-literal
        result.getFields()["model2"].resolve("v1", { v2: "v2" }, "v3", {});
        expect(generator.resolver.resolve.calls.allArgs()).toEqual([[{
                    args: { v2: "v2" },
                    attrName: "model2",
                    context: "v3",
                    identity: "model2",
                    parentIdentity: "model1",
                    root: "v1",
                    type: type_2.default.Submodel,
                }]]);
    });
});
