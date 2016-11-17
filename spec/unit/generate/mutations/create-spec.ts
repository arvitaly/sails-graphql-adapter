import Generator from "./../../../../generate/generator";
import generateCreateMutation from "./../../../../generate/mutations/create";
import { GraphQLFieldConfig, GraphQLInt, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
describe("Generate CreateMutation spec", () => {
    it("", () => {
        const generator = new Generator({
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
                } as any,
            },
        });
        const expected: Array<{ name: string, field: GraphQLFieldConfig<any> }> = [{
            field: mutationWithClientMutationId({
                inputFields: {
                    name: {
                        type: GraphQLString
                    },
                    num: {
                        type: GraphQLInt,
                    },
                },
                mutateAndGetPayload: jasmine.any(Function) as any,
                name: "CreateModel1Mutation",
                outputFields: {
                    model1: {
                        type: generator.getType("model1"),
                    },
                },
            }),
            name: "createModel1",
        }];
        const result = generateCreateMutation("model1", generator);
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
