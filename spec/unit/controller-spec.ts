import Controller from "./../../controller";
import * as mock from "mock2";
describe("Controller spec", () => {
    let controller: typeof Controller;
    let graphqlHTTP: jasmine.Spy;
    let graphqlHTTPHandler: jasmine.Spy;
    let req = "req1";
    let res = "res1";
    let schema = "schema";
    let sails = "sails";
    let generateSpy: jasmine.Spy;
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
        controller({ schema: schema as any }).index(req, res);
        expect(graphqlHTTP.calls.allArgs()).toEqual([[{
            context: {
                request: req,
                response: res,
            },
            schema,
            graphiql: true,
        }]]);
        expect(graphqlHTTPHandler.calls.allArgs()).toEqual([["req1", "res1"]]);
    });
    it("when schema not setted and set sails, should generate schema and call graphqlHTTP with this schema", () => {
        graphqlHTTP.and.returnValue(graphqlHTTPHandler);
        generateSpy.and.returnValue(schema);
        controller({ sails: sails as any }).index(req, res);
        expect(generateSpy.calls.allArgs()).toEqual([[sails]]);
        expect(graphqlHTTP.calls.allArgs()).toEqual([[{
            context: {
                request: req,
                response: res,
            },
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
            context: {
                request: req,
                response: res,
            },
            schema,
            graphiql: true,
        }]]);
        expect(graphqlHTTPHandler.calls.allArgs()).toEqual([["req1", "res1"]]);
        delete global["sails"];
    });
});
