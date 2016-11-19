"use strict";
const args_1 = require("./../../../generate/args");
const generator1_1 = require("./../../fixtures/generator1");
describe("Args for queries spec", () => {
    it("when called should create all useful args", () => {
        const result = args_1.default("modelname1", generator1_1.default);
        let count = 0;
        for (let argName in result) {
            argName = argName;
            count++;
        }
        expect(count).toBe(52);
    });
});
