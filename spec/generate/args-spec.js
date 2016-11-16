"use strict";
const graphql_1 = require('graphql');
const args_1 = require('./../../generate/args');
const model_1 = require('./../../model');
describe("Args for model spec", () => {
    it("when attribute not object (only string-type), should convert it to object with default type params", () => {
    });
    it("when attribute is string, should create name, nameContains, nameStartsWith, nameEndsWith, nameLike args", () => {
        const defaultStr1 = "def";
        const expected = {
            str1: {
                type: graphql_1.GraphQLString,
                defaultValue: null,
                description: "str1"
            },
            str1Contains: {
                type: graphql_1.GraphQLString,
                defaultValue: null,
                description: "str1"
            },
            str1EndsWith: {
                type: graphql_1.GraphQLString,
                defaultValue: null,
                description: "str1"
            },
            str1StartsWith: {
                type: graphql_1.GraphQLString,
                defaultValue: null,
                description: "str1"
            },
            str1Like: {
                type: graphql_1.GraphQLString,
                defaultValue: null,
                description: "str1"
            },
            str1In: {
                type: new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)),
                defaultValue: null,
                description: "str1"
            }
        };
        const result = args_1.default(new model_1.Model({
            globalId: "Model1",
            attributes: {
                str1: {
                    type: "string",
                    defaultsTo: defaultStr1
                }
            }
        }));
        expect(result).toEqual(expected);
    });
});
