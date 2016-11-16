"use strict";
const mock = require('mock2');
describe("Controller spec", () => {
    let controller, graphqlHTTP, graphqlHTTPHandler, req = "req1", res = "res1", schema = "schema";
    beforeEach(() => {
        graphqlHTTP = jasmine.createSpy("");
        graphqlHTTPHandler = jasmine.createSpy("");
        controller = mock.require('./../controller', {
            "express-graphql": graphqlHTTP
        }).default;
    });
    it("when schema setted and call index, should call graphqlHTTP with this schema", () => {
        graphqlHTTP.and.returnValue(graphqlHTTPHandler);
        controller(schema).index(req, res);
        expect(graphqlHTTP.calls.allArgs()).toEqual([[{ schema: schema, graphiql: true }]]);
        expect(graphqlHTTPHandler.calls.allArgs()).toEqual([["req1", "res1"]]);
    });
});
