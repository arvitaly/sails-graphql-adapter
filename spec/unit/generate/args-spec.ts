import argsForQuery from "./../../../generate/args";
import generator from "./../../fixtures/generator1";
describe("Args for queries spec", () => {
    it("when called should create all useful args", () => {
        const result = argsForQuery("modelname1", generator);
        let count = 0;
        for (let argName in result) {
            if (result.hasOwnProperty(argName)) {
                count++;
            }
        }
        expect(count).toBe(49);
    });
});
