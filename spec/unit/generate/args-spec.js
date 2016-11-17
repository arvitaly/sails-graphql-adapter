"use strict";
const args_1 = require("./../../../generate/args");
const model_1 = require("./../../../model");
const model1_1 = require("./../../fixtures/model1");
const graphql_1 = require("graphql");
fdescribe("Args for model spec", () => {
    it("when called should create all useful args", () => {
        const expected = {
            firstActive: { type: graphql_1.GraphQLString },
            firstActiveGreaterThan: { type: graphql_1.GraphQLString },
            firstActiveGreaterThanOrEqual: { type: graphql_1.GraphQLString },
            firstActiveIn: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)) },
            firstActiveLessThan: { type: graphql_1.GraphQLString },
            firstActiveLessThanOrEqual: { type: graphql_1.GraphQLString },
            lastActive: { type: graphql_1.GraphQLString },
            lastActiveGreaterThan: { type: graphql_1.GraphQLString },
            lastActiveGreaterThanOrEqual: { type: graphql_1.GraphQLString },
            lastActiveIn: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)) },
            lastActiveLessThan: { type: graphql_1.GraphQLString },
            lastActiveLessThanOrEqual: { type: graphql_1.GraphQLString },
            num: { type: graphql_1.GraphQLInt },
            numGreaterThan: { type: graphql_1.GraphQLInt },
            numGreaterThanOrEqual: { type: graphql_1.GraphQLInt },
            numIn: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)) },
            numLessThan: { type: graphql_1.GraphQLInt },
            numLessThanOrEqual: { type: graphql_1.GraphQLInt },
            str1: { type: graphql_1.GraphQLString },
            str1Contains: { type: graphql_1.GraphQLString },
            str1EndsWith: { type: graphql_1.GraphQLString },
            str1In: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)) },
            str1Like: { type: graphql_1.GraphQLString },
            str1StartsWith: { type: graphql_1.GraphQLString },
            sum: { type: graphql_1.GraphQLFloat },
            sumGreaterThan: { type: graphql_1.GraphQLFloat },
            sumGreaterThanOrEqual: { type: graphql_1.GraphQLFloat },
            sumIn: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat)) },
            sumLessThan: { type: graphql_1.GraphQLFloat },
            sumLessThanOrEqual: { type: graphql_1.GraphQLFloat },
        };
        const result = args_1.default(new model_1.Model(model1_1.default));
        expect(result).toEqual(expected);
    });
});
