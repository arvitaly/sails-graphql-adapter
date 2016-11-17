"use strict";
const string_1 = require("./../../../../generate/query-args/string");
const graphql_1 = require("graphql");
describe("Query's args for string attribute", () => {
    it("should return all useful args", () => {
        const str = "Str1";
        expect(string_1.default(str)).toEqual([
            { field: { type: graphql_1.GraphQLString }, name: str },
            { field: { type: graphql_1.GraphQLString }, name: str + "Contains" },
            { field: { type: graphql_1.GraphQLString }, name: str + "StartsWith" },
            { field: { type: graphql_1.GraphQLString }, name: str + "EndsWith" },
            { field: { type: graphql_1.GraphQLString }, name: str + "Like" },
            { field: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)) }, name: str + "In" },
        ]);
    });
});
