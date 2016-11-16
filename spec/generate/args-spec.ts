import { GraphQLFieldConfigArgumentMap, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import argsForModel from './../../generate/args';
describe("Args for model spec", () => {
    it("when attribute not object (only string-type), should convert it to object with default type params", () => {

    })
    it("when attribute is string, should create name, nameContains, nameStartsWith, nameEndsWith, nameLike args", () => {
        const defaultStr1 = "def";
        const expected: GraphQLFieldConfigArgumentMap = {
            str1: {
                type: GraphQLString,
                defaultValue: null,
                description: "str1"
            },
            str1Contains: {
                type: GraphQLString,
                defaultValue: null,
                description: "str1"
            },
            str1EndsWith: {
                type: GraphQLString,
                defaultValue: null,
                description: "str1"
            },
            str1StartsWith: {
                type: GraphQLString,
                defaultValue: null,
                description: "str1"
            },
            str1Like: {
                type: GraphQLString,
                defaultValue: null,
                description: "str1"
            },
            str1In: {
                type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
                defaultValue: null,
                description: "str1"
            }
        }
        const result = argsForModel({
            globalId: "Model1",
            attributes: {
                str1: {
                    type: "string",
                    defaultsTo: defaultStr1
                }
            }
        } as any);
        expect(result).toEqual(expected);
    })
})