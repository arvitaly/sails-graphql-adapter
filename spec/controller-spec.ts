import * as mock from 'mock2';
import Controller from './../controller';
describe("Controller spec", () => {
    let controller: typeof Controller, graphqlHTTP: jasmine.Spy, graphqlHTTPHandler: jasmine.Spy, req = "req1", res = "res1", schema = "schema";
    beforeEach(() => {
        graphqlHTTP = jasmine.createSpy("");
        graphqlHTTPHandler = jasmine.createSpy("");
        controller = mock.require('./../controller', {
            "express-graphql": graphqlHTTP
        }).default;
    })
    it("when schema setted and call index, should call graphqlHTTP with this schema", () => {
        graphqlHTTP.and.returnValue(graphqlHTTPHandler);
        controller(schema as any).index(req, res);
        expect(graphqlHTTP.calls.allArgs()).toEqual([[{ schema: schema, graphiql: true }]]);
        expect(graphqlHTTPHandler.calls.allArgs()).toEqual([["req1", "res1"]]);
    })
})