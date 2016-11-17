"use strict";
const mock = require("mock2");
describe("Controller spec", () => {
    let controller;
    let graphqlHTTP;
    let graphqlHTTPHandler;
    let req = "req1";
    let res = "res1";
    let schema = "schema";
    let sails = "sails";
    let generateSpy;
    beforeEach(() => {
        graphqlHTTP = jasmine.createSpy("");
        graphqlHTTPHandler = jasmine.createSpy("");
        generateSpy = jasmine.createSpy("");
        controller = mock.require("./../../controller", {
            "express-graphql": graphqlHTTP,
            "./../../generate": { default: generateSpy },
        }).default;
    });
    it("when schema setted and call index, should call graphqlHTTP with this schema", () => {
        graphqlHTTP.and.returnValue(graphqlHTTPHandler);
        controller({ schema: schema }).index(req, res);
        expect(graphqlHTTP.calls.allArgs()).toEqual([[{
                    schema,
                    graphiql: true,
                }]]);
        expect(graphqlHTTPHandler.calls.allArgs()).toEqual([["req1", "res1"]]);
    });
    it("when schema not setted and set sails, should generate schema and call graphqlHTTP with this schema", () => {
        graphqlHTTP.and.returnValue(graphqlHTTPHandler);
        generateSpy.and.returnValue(schema);
        controller({ sails: sails }).index(req, res);
        expect(generateSpy.calls.allArgs()).toEqual([[sails]]);
        expect(graphqlHTTP.calls.allArgs()).toEqual([[{
                    schema,
                    graphiql: true,
                }]]);
        expect(graphqlHTTPHandler.calls.allArgs()).toEqual([["req1", "res1"]]);
    });
    it("when schema not setted and sails not setted, should get global sails", () => {
        graphqlHTTP.and.returnValue(graphqlHTTPHandler);
        generateSpy.and.returnValue(schema);
        // tslint:disable:no-string-literal
        global["sails"] = sails;
        controller().index(req, res);
        expect(generateSpy.calls.allArgs()).toEqual([[sails]]);
        expect(graphqlHTTP.calls.allArgs()).toEqual([[{
                    schema,
                    graphiql: true,
                }]]);
        expect(graphqlHTTPHandler.calls.allArgs()).toEqual([["req1", "res1"]]);
        delete global["sails"];
    });
});
