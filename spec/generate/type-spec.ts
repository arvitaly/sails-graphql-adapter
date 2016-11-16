import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } from 'graphql';
import generateType from './../../generate/type';
import { Model } from './../../model';
import ResolveType from './../../resolve/type';
import Generator from './../../generate/generator';
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
        } as any;
        const model2 = {
            globalId: "Model2",
            identity: "model2",
            attributes: {
                name: "string"
            }
        } as any;
        const generator = new Generator({
            models: {
                model1: model1,
                model2: model2
            }
        });
        spyOn(generator.resolver, "resolve");
        const expected = new GraphQLObjectType({
            name: "Model1",
            description: "Model1",
            fields: {
                name: { type: GraphQLString },
                title: { type: GraphQLString },
                num: { type: GraphQLInt },
                sum: { type: GraphQLFloat },
                lastActive: { type: GraphQLString },
                firstActive: { type: GraphQLString },
                model2: {
                    type: new GraphQLObjectType({
                        name: "Model2",
                        description: "Model2",
                        fields: {
                            name: { type: GraphQLString },
                        },
                        interfaces: []
                    }),
                    resolve: jasmine.any(Function) as any
                }
            },
            interfaces: []
        });
        const result = generateType("model1", generator);
        expect(result).toEqual(expected);
        result.getFields()["model2"].resolve("v1", { v2: "v2" }, "v3", {} as any);
        expect((generator.resolver.resolve as any).calls.allArgs()).toEqual([[{
            attrName: "model2",
            type: ResolveType.Submodel,
            identity: "model2",
            parentIdentity: "model1",
            root: "v1",
            args: { v2: "v2" },
            context: "v3"
        }]]);
    })
})