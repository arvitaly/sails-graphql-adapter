"use strict";
const graphql_1 = require('graphql');
const type_1 = require('./../../generate/type');
const type_2 = require('./../../resolve/type');
const generator_1 = require('./../../generate/generator');
describe("Generate graphql type for model spec", () => {
    it("when created, should return GraphQLObject", () => {
        const model1 = {
            globalId: "Model1",
            identity: "model1",
            attributes: {
                name: "string",
                title: { type: "string" },
                num: "integer",
                sum: "float",
                lastActive: "datetime",
                firstActive: "date",
                model2: {
                    model: "model2"
                }
            }
        };
        const model2 = {
            globalId: "Model2",
            identity: "model2",
            attributes: {
                name: "string"
            }
        };
        const generator = new generator_1.default({
            models: {
                model1: model1,
                model2: model2
            }
        });
        spyOn(generator.resolver, "resolve");
        const expected = new graphql_1.GraphQLObjectType({
            name: "Model1",
            description: "Model1",
            fields: {
                name: { type: graphql_1.GraphQLString },
                title: { type: graphql_1.GraphQLString },
                num: { type: graphql_1.GraphQLInt },
                sum: { type: graphql_1.GraphQLFloat },
                lastActive: { type: graphql_1.GraphQLString },
                firstActive: { type: graphql_1.GraphQLString },
                model2: {
                    type: new graphql_1.GraphQLObjectType({
                        name: "Model2",
                        description: "Model2",
                        fields: {
                            name: { type: graphql_1.GraphQLString },
                        },
                        interfaces: []
                    }),
                    resolve: jasmine.any(Function)
                }
            },
            interfaces: []
        });
        const result = type_1.default("model1", generator);
        expect(result).toEqual(expected);
        result.getFields()["model2"].resolve("v1", { v2: "v2" }, "v3", {});
        expect(generator.resolver.resolve.calls.allArgs()).toEqual([[{
                    attrName: "model2",
                    type: type_2.default.Submodel,
                    identity: "model2",
                    parentIdentity: "model1",
                    root: "v1",
                    args: { v2: "v2" },
                    context: "v3"
                }]]);
    });
});
