import argsForModel from "./../../../generate/args";
import { Model } from "./../../../model";
import {
    GraphQLFieldConfigArgumentMap, GraphQLFloat, GraphQLInt,
    GraphQLList, GraphQLNonNull, GraphQLString
} from "graphql";
describe("Args for model spec", () => {
    it("when called should create all useful args", () => {
        const expected: GraphQLFieldConfigArgumentMap = {
            firstActive: { type: GraphQLString },
            firstActiveGreaterThan: { type: GraphQLString },
            firstActiveGreaterThanOrEqual: { type: GraphQLString },
            firstActiveIn: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
            firstActiveLessThan: { type: GraphQLString },
            firstActiveLessThanOrEqual: { type: GraphQLString },
            lastActive: { type: GraphQLString },
            lastActiveGreaterThan: { type: GraphQLString },
            lastActiveGreaterThanOrEqual: { type: GraphQLString },
            lastActiveIn: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
            lastActiveLessThan: { type: GraphQLString },
            lastActiveLessThanOrEqual: { type: GraphQLString },
            num: { type: GraphQLInt },
            numGreaterThan: { type: GraphQLInt },
            numGreaterThanOrEqual: { type: GraphQLInt },
            numIn: { type: new GraphQLList(new GraphQLNonNull(GraphQLInt)) },
            numLessThan: { type: GraphQLInt },
            numLessThanOrEqual: { type: GraphQLInt },
            str1: { type: GraphQLString },
            str1Contains: { type: GraphQLString },
            str1EndsWith: { type: GraphQLString },
            str1In: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
            str1Like: { type: GraphQLString },
            str1StartsWith: { type: GraphQLString },
            sum: { type: GraphQLFloat },
            sumGreaterThan: { type: GraphQLFloat },
            sumGreaterThanOrEqual: { type: GraphQLFloat },
            sumIn: { type: new GraphQLList(new GraphQLNonNull(GraphQLFloat)) },
            sumLessThan: { type: GraphQLFloat },
            sumLessThanOrEqual: { type: GraphQLFloat },
        }
        const result = argsForModel(new Model({
            attributes: {
                firstActive: "date",
                lastActive: "datetime",
                num: "integer",
                str1: {
                    type: "string"
                },
                sum: {
                    type: "float"
                },
            },
            globalId: "Model1",
        } as any));
        expect(result).toEqual(expected);
    })
})