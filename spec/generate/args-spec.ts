import { GraphQLFieldConfigArgumentMap, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import argsForModel from './../../generate/args';
import { Model } from './../../model';
describe("Args for model spec", () => {
    it("when attribute not object (only string-type), should convert it to object with default type params", () => {

    })
    it("when attribute is string, should create name, nameContains, nameStartsWith, nameEndsWith, nameLike args", () => {
        const defaultStr1 = "def";
        const expected: GraphQLFieldConfigArgumentMap = {
            str1: { type: GraphQLString },
            str1Contains: { type: GraphQLString },
            str1EndsWith: { type: GraphQLString },
            str1StartsWith: { type: GraphQLString },
            str1Like: { type: GraphQLString },
            str1In: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }
        }
        const result = argsForModel(new Model({
            globalId: "Model1",
            attributes: {
                str1: {
                    type: "string",
                    defaultsTo: defaultStr1
                }
            }
        } as any));
        expect(result).toEqual(expected);
    })
})