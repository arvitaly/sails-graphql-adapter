import Controller from "./../../controller";
import * as mock from "mock2";
describe("Controller spec", () => {
    let controller: typeof Controller;
    let graphqlHTTP: jasmine.Spy;
    let graphqlHTTPHandler: jasmine.Spy;
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
        controller(schema as any).index(req, res);
        expect(graphqlHTTP.calls.allArgs()).toEqual([[{
            schema,
            graphiql: true,
        }]]);
        expect(graphqlHTTPHandler.calls.allArgs()).toEqual([["req1", "res1"]]);
    });
});
