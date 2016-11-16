import { GraphQLFieldConfigArgumentMap, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLFloat } from 'graphql';
import argsForModel from './../../generate/args';
import { Model } from './../../model';
describe("Args for model spec", () => {
    it("when called should create all useful args", () => {
        const defaultStr1 = "def";
        const expected: GraphQLFieldConfigArgumentMap = {
            str1: { type: GraphQLString },
            str1Contains: { type: GraphQLString },
            str1EndsWith: { type: GraphQLString },
            str1StartsWith: { type: GraphQLString },
            str1Like: { type: GraphQLString },
            str1In: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
            num: { type: GraphQLInt },
            numLessThan: { type: GraphQLInt },
            numLessThanOrEqual: { type: GraphQLInt },
            numGreaterThan: { type: GraphQLInt },
            numGreaterThanOrEqual: { type: GraphQLInt },
            numIn: { type: new GraphQLList(new GraphQLNonNull(GraphQLInt)) },
            sum: { type: GraphQLFloat },
            sumLessThan: { type: GraphQLFloat },
            sumLessThanOrEqual: { type: GraphQLFloat },
            sumGreaterThan: { type: GraphQLFloat },
            sumGreaterThanOrEqual: { type: GraphQLFloat },
            sumIn: { type: new GraphQLList(new GraphQLNonNull(GraphQLFloat)) },
            lastActive: { type: GraphQLString },
            lastActiveLessThan: { type: GraphQLString },
            lastActiveLessThanOrEqual: { type: GraphQLString },
            lastActiveGreaterThan: { type: GraphQLString },
            lastActiveGreaterThanOrEqual: { type: GraphQLString },
            lastActiveIn: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },            
            firstActive: { type: GraphQLString },
            firstActiveLessThan: { type: GraphQLString },
            firstActiveLessThanOrEqual: { type: GraphQLString },
            firstActiveGreaterThan: { type: GraphQLString },
            firstActiveGreaterThanOrEqual: { type: GraphQLString },
            firstActiveIn: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }
        }
        const result = argsForModel(new Model({
            globalId: "Model1",
            attributes: {
                str1: {
                    type: "string"
                },
                num: "integer",
                sum: {
                    type: "float"
                },
                lastActive: "datetime",
                firstActive: "date"
            }
        } as any));
        expect(result).toEqual(expected);
    })
})