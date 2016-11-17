"use strict";
const mock = require("mock2");
describe("Controller spec", () => {
    let controller;
    let graphqlHTTP;
    let graphqlHTTPHandler;
    let req = "req1";
    let res = "res1";
    let schema = "schema";
    beforeEach(() => {
        graphqlHTTP = jasmine.createSpy("");
        graphqlHTTPHandler = jasmine.createSpy("");
        controller = mock.require("./../controller", {
            "express-graphql": graphqlHTTP,
        }).default;
    });
    it("when schema setted and call index, should call graphqlHTTP with this schema", () => {
        graphqlHTTP.and.returnValue(graphqlHTTPHandler);
        controller(schema).index(req, res);
        expect(graphqlHTTP.calls.allArgs()).toEqual([[{
                    schema,
                    graphiql: true,
                }]]);
        expect(graphqlHTTPHandler.calls.allArgs()).toEqual([["req1", "res1"]]);
    });
});
