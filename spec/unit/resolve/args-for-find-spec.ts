import Model from "./../../../model/model";
import argsToFind from "./../../../resolve/args-to-find";
describe("Args for find spec", () => {
    it("when args has sort, skip or limit should set in find params", () => {
        expect(argsToFind(new Model({
            globalId: "id1",
        } as any), {
                limit: 10,
                skip: 0,
                sort: "name asc",
            })).toEqual({
                limit: 10,
                skip: 0,
                sort: "name asc",
                where: {},
            });
    });
});
