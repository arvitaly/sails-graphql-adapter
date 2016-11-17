"use strict";
const model_1 = require("./../../../model");
const args_to_find_1 = require("./../../../resolve/args-to-find");
describe("Args for find spec", () => {
    it("when args has sort, skip or limit should set in find params", () => {
        expect(args_to_find_1.default(new model_1.Model({
            globalId: "id1",
        }), {
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
