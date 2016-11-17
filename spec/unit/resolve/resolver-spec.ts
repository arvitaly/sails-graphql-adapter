import Resolver from "./../../../resolve/resolver";
import ResolveType from "./../../../resolve/type";
import generator from "./../../fixtures/generator1";
import model1 from "./../../fixtures/model1";
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
});
