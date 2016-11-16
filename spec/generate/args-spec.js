"use strict";
const graphql_1 = require('graphql');
const args_1 = require('./../../generate/args');
const model_1 = require('./../../model');
describe("Args for model spec", () => {
    it("when called should create all useful args", () => {
        const defaultStr1 = "def";
        const expected = {
            str1: { type: graphql_1.GraphQLString },
            str1Contains: { type: graphql_1.GraphQLString },
            str1EndsWith: { type: graphql_1.GraphQLString },
            str1StartsWith: { type: graphql_1.GraphQLString },
            str1Like: { type: graphql_1.GraphQLString },
            str1In: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)) },
            num: { type: graphql_1.GraphQLInt },
            numLessThan: { type: graphql_1.GraphQLInt },
            numLessThanOrEqual: { type: graphql_1.GraphQLInt },
            numGreaterThan: { type: graphql_1.GraphQLInt },
            numGreaterThanOrEqual: { type: graphql_1.GraphQLInt },
            numIn: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)) },
            sum: { type: graphql_1.GraphQLFloat },
            sumLessThan: { type: graphql_1.GraphQLFloat },
            sumLessThanOrEqual: { type: graphql_1.GraphQLFloat },
            sumGreaterThan: { type: graphql_1.GraphQLFloat },
            sumGreaterThanOrEqual: { type: graphql_1.GraphQLFloat },
            sumIn: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat)) },
            lastActive: { type: graphql_1.GraphQLString },
            lastActiveLessThan: { type: graphql_1.GraphQLString },
            lastActiveLessThanOrEqual: { type: graphql_1.GraphQLString },
            lastActiveGreaterThan: { type: graphql_1.GraphQLString },
            lastActiveGreaterThanOrEqual: { type: graphql_1.GraphQLString },
            lastActiveIn: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)) },
            firstActive: { type: graphql_1.GraphQLString },
            firstActiveLessThan: { type: graphql_1.GraphQLString },
            firstActiveLessThanOrEqual: { type: graphql_1.GraphQLString },
            firstActiveGreaterThan: { type: graphql_1.GraphQLString },
            firstActiveGreaterThanOrEqual: { type: graphql_1.GraphQLString },
            firstActiveIn: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)) }
        };
        const result = args_1.default(new model_1.Model({
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
        }));
        expect(result).toEqual(expected);
    });
});
