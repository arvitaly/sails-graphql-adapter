import generate from "./../../generate";
import app1 from "./app1";
import { graphql } from "graphql";
/* tslint:disable:no-string-literal */
describe("Function tests for queries", () => {
    beforeEach((done) => {
        global["l"] = console.log;
        app1(done);
    });
    pit("query for single model", async () => {
        // TODO: create test for single model
        await sails.models["model1"].create({ name: "n1" });
        const schema = generate(sails);
        expect(j(await graphql(schema, `query Q1 {model1(nameContains:"n1"){name}}`))).toEqual({
            model1: {
                name: "n1",
            },
        });
    });
    pit("query for connection of model", async () => {
        // TODO: create test for connection of model
        await sails.models["model1"].create([{ name: "n1" }, { name: "n2" }]);
        const schema = generate(sails);
        const result = await graphql(schema, `query Q1 {model1s(nameContains:"n"){edges{node{name} }}}`);
        expect(j(result)).toEqual({
            model1s: {
                edges: [{
                    node: {
                        name: "n1",
                    },
                }, {
                    node: {
                        name: "n2",
                    },
                }],
            },
        });
    });
    it("query for count of model", () => {
        // TODO: create test for count of model
    });
    afterEach((done) => {
        sails.lower(done);
    });
});
function j(data) {
    return JSON.parse(JSON.stringify(data)).data;
}
