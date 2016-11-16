import { graphql } from 'graphql';
import * as Sails from 'sails';
import generate from './../../generate';
const SailsConstructor = Sails.constructor;
describe("Generate functional tests", () => {
    let sails: Sails.Sails, app: Sails.App;
    beforeEach((done) => {
        app = new SailsConstructor();
        app.load({
            log: {
                level: "warn"
            },
            models: {
                connection: "memory",
                migrate: "drop"
            },
            connections: {
                memory: {
                    adapter: "sails-memory"
                }
            },
            appPath: __dirname + "/app1"
        }, (err, sails_) => {
            if (err) {
                fail(err);
                done();
                return;
            }
            sails = sails_;
            done();
        })
    })
    pit("when args has nameContains and name contains it, should return one record", async () => {
        await sails.models["model1"].create({ name: "test1" });
        const schema = generate(sails);
        expect(j(await graphql(schema, `query Q1 {model1(nameContains:"te"){name}}`))).toEqual({
            model1: {
                name: "test1"
            }
        });
    })
    pit("when args has nameContains and name not contains it, should return null", async () => {
        await sails.models["model1"].create({ name: "test1" });
        const schema = generate(sails);
        expect(j(await graphql(schema, `query Q1 {model1(nameContains:"fe"){name}}`))).toEqual({ model1: null });
    })
    afterEach((done) => {
        if (sails) {
            app.lower(done);
        } else {
            done();
        }
    })
})
function j(data) {
    return JSON.parse(JSON.stringify(data)).data;
}