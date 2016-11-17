import Resolver from "./../../../resolve/resolver";
import ResolveType from "./../../../resolve/type";
import generator from "./../../fixtures/generator1";
import model1 from "./../../fixtures/model1";
import { Connection } from "graphql-relay";
describe("Resolver spec", () => {
    pit("when resolve existing model should return it", async () => {
        const findSpy = spyOn(model1, "find");
        const m1 = {
            id: 1,
            name: "nameTest",
            title: "titleTest",
        };
        findSpy.and.returnValue([m1]);
        const resolver = new Resolver(generator);
        const result = await resolver.resolve({
            args: {
                nameContains: "te",
            },
            identity: "modelname1",
            type: ResolveType.Model,
        });
        expect(result).toEqual(m1);
    });
    pit("when resolve connection, should return", async () => {
        const findSpy = spyOn(model1, "find");
        const m1 = {
            id: 1,
            name: "nameTest",
            title: "titleTest",
        };
        const m2 = {
            id: 2,
            name: "nameTest",
            title: "titleTest",
        };
        findSpy.and.returnValue([m1, m2]);
        const resolver = new Resolver(generator);
        const result = await resolver.resolve({
            args: {
                nameContains: "te",
            },
            identity: "modelname1",
            type: ResolveType.ListOfModel,
        });
        const expected: Connection<any> = {
            edges: [m1, m2].map((n) => {
                return {
                    cursor: "",
                    node: n,
                };
            }),
            pageInfo: {
                endCursor: "",
                hasNextPage: true,
                hasPreviousPage: true,
                startCursor: "",
            },
        };
        expect(result).toEqual(expected);
    });
});
