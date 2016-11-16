import argsToFind from './../../resolve/args-to-find';
import { Model } from './../../model';
describe("Args for find spec", () => {
    it("when args has sort, skip or limit should set in find params", () => {
        expect(argsToFind(new Model({
            globalId: "id1"
        } as any), {
            sort: "name asc",
            limit: 10,
            skip: 0
        })).toEqual({
            where: {},
            sort: "name asc",
            limit: 10,
            skip: 0
        })
    })
})