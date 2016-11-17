import Generator from "./../../../generate/generator";
import generateType from "./../../../generate/type";
import ResolveType from "./../../../resolve/type";
import { GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
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
        } as any;
        const model2 = {
            attributes: {
                name: "string"
            },
            globalId: "Model2",
            identity: "model2",
        } as any;
        const generator = new Generator({ models: { model1, model2 } });
        spyOn(generator.resolver, "resolve");
        const expected = new GraphQLObjectType({
            description: "Model1",
            fields: {
                firstActive: { type: GraphQLString },
                lastActive: { type: GraphQLString },
                model2: {
                    resolve: jasmine.any(Function) as any,
                    type: new GraphQLObjectType({
                        description: "Model2",
                        fields: {
                            name: { type: GraphQLString },
                        },
                        interfaces: [],
                        name: "Model2",
                    }),
                },
                name: { type: GraphQLString },
                num: { type: GraphQLInt },
                sum: { type: GraphQLFloat },
                title: { type: GraphQLString },
            },
            interfaces: [],
            name: "Model1",

        });
        const result = generateType("model1", generator);
        expect(result).toEqual(expected);
        // tslint:disable:no-string-literal
        result.getFields()["model2"].resolve("v1", { v2: "v2" }, "v3", {} as any);
        expect((generator.resolver.resolve as any).calls.allArgs()).toEqual([[{
            args: { v2: "v2" },
            attrName: "model2",
            context: "v3",
            identity: "model2",
            parentIdentity: "model1",
            root: "v1",
            type: ResolveType.Submodel,
        }]]);
    })
})