import generateCreateMutation from "./../../../../generate/mutations/create";
import generator from "./../../../fixtures/generator1";
import { GraphQLBoolean, GraphQLFieldConfig, GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
describe("Generate CreateMutation spec", () => {
    it("", () => {
        const expected: Array<{ name: string, field: GraphQLFieldConfig<any> }> = [{
            field: mutationWithClientMutationId({
                inputFields: {
                    createModel2Field: { type: generator.getCreateType("model2") },
                    firstActive: { type: new GraphQLNonNull(GraphQLString) },
                    id: { type: GraphQLInt },
                    isActive: { type: new GraphQLNonNull(GraphQLBoolean) },
                    lastActive: { type: GraphQLString },
                    model2Field: { type: GraphQLString },
                    name: { type: GraphQLString },
                    num: { type: new GraphQLNonNull(GraphQLInt) },
                    sum: { type: GraphQLFloat },
                    title: { type: GraphQLString },
                },
                mutateAndGetPayload: jasmine.any(Function) as any,
                name: "CreateModelName1Mutation",
                outputFields: {
                    modelName1: {
                        type: generator.getType("modelname1"),
                    },
                },
            }),
            name: "createModelName1",
        }];
        const result = generateCreateMutation("modelname1", generator);
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
