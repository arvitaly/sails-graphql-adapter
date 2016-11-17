import { Args } from "./../../../../generate/args";
import argsForString from "./../../../../generate/query-args/string";
import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
describe("Query's args for string attribute", () => {
    it("should return all useful args", () => {
        const str = "Str1";
        expect(argsForString(str)).toEqual(<Args> [
            { field: { type: GraphQLString }, name: str },
            { field: { type: GraphQLString }, name: str + "Contains" },
            { field: { type: GraphQLString }, name: str + "StartsWith" },
            { field: { type: GraphQLString }, name: str + "EndsWith" },
            { field: { type: GraphQLString }, name: str + "Like" },
            { field: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }, name: str + "In" },
        ]);
    });
});
