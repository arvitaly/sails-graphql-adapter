import generate from "./../../generate";
import app1 from "./app1";
import { graphql } from "graphql";
describe("Functional tests for generate", () => {
    beforeEach((done) => {
        app1(done);
    });
    /* tslint:disable:no-string-literal */
    pit("when args has nameContains and name contains it, should return one record", async () => {
        await sails.models["model1"].create({ name: "test1" });
        const schema = generate(sails);
        expect(j(await graphql(schema, `query Q1 {model1(nameContains:"te"){name}}`))).toEqual({
            model1: {
                name: "test1",
            },
        });
    });
    pit("when args has nameContains and name not contains it, should return null", async () => {
        await sails.models["model1"].create({ name: "test1" });
        const schema = generate(sails);
        expect(j(await graphql(schema, `query Q1 {model1(nameContains:"fe"){name}}`))).toEqual({ model1: null });
    });
    pit("when args has In and model in one of values, should return one record", async () => {
        await sails.models["model1"].create({ num: 14 });
        const schema = generate(sails);
        expect(j(await graphql(schema, `query Q1 {model1(numIn:[14,15]){num}}`))).toEqual({
            model1: {
                num: 14,
            },
        });
    });
    afterEach((done) => {
        sails.lower(done);
    });
});
function j(data) {
    return JSON.parse(JSON.stringify(data)).data;
}
