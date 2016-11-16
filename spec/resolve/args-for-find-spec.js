"use strict";
const args_to_find_1 = require('./../../resolve/args-to-find');
const model_1 = require('./../../model');
describe("Args for find spec", () => {
    it("when args has sort, skip or limit should set in find params", () => {
        expect(args_to_find_1.default(new model_1.Model({
            globalId: "id1"
        }), {
            sort: "name asc",
            limit: 10,
            skip: 0
        })).toEqual({
            where: {},
            sort: "name asc",
            limit: 10,
            skip: 0
        });
    });
});
