import generate from "./../../generate";
import app1 from "./app1";
import { graphql } from "graphql";
const dt1 = "Fri Nov 18 2016 18:25:11 GMT+0700 (SE Asia Standard Time)";
fdescribe("Function tests for queries", () => {
    let query: (q: string) => Promise<{ data: any, errors: Array<any> }>;
    pit("query for single model", async () => {
        const dt2 = "Fri Nov 10 2016 18:25:11 GMT+0700 (SE Asia Standard Time)";
        const dt3 = "Fri Nov 20 2016 18:25:11 GMT+0700 (SE Asia Standard Time)";
        await createRow({ isActive: true, name: "fn1f" });
        expect(await query(
            `query Q1 {modelName1(
                nameContains:"n1"
                isActive: true
                lastActiveGreaterThan:"${dt2}"                
                lastActiveLessThan :"${dt3}"
            ){name lastActive}}`
        )).toEqual({
            modelName1: {
                lastActive: dt1,
                name: "fn1f",
            },
        });
    });
    pit("query for connection of model", async () => {
        await createRow({ name: "n1" });
        await createRow({ name: "n2" });
        const result = await query(`query Q1 {modelName1s(nameContains:"n"){edges{node{name} }}}`);
        expect(result).toEqual({
            modelName1s: {
                edges: [
                    { node: { name: "n1" } },
                    { node: { name: "n2" } }],
            },
        });
    });
    it("query for count of model", () => {
        // TODO: create test for count of model
    });
    /* tslint:disable:no-string-literal */
    beforeEach((done) => {
        global["l"] = console.log;
        app1(() => {
            const schema = generate(sails);
            query = async (q: string) => {
                const result = await graphql(schema, q);
                if (result.errors) {
                    console.error(result.errors);
                    fail(result.errors);
                    return;
                }
                return j(result.data);
            };
            done();
        });
    });
    afterEach((done) => {
        sails.lower(done);
    });
});
function j(data) {
    return JSON.parse(JSON.stringify(data));
}

const row1 = {
    firstActive: dt1,
    isActive: false,
    lastActive: dt1,
    name: "n1",
    num: 0,
};
function getRow(params) {
    return Object.assign({}, row1, params);
};

function createRow(params) {
    return sails.models["modelname1"].create(getRow(params));
}
