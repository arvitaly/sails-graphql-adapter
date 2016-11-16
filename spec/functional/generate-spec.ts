import { graphql } from 'graphql';
import * as Sails from 'sails';
import generate from './../../generate'
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
                migrate: "drop"
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
    it("Test", async (done) => {
        try {
            await sails.models["model1"].create({name: "test1"});
            const schema = generate(sails.models);
            expect(j(await graphql(schema, `query Q1 {model1(nameContains:"ghj"){name}}`))).toEqual({
                data:{
                    model1:{
                        name: "test1"
                    }
                }
            });
            done();
        } catch (e) {
            fail(e);
            done()
        }
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
    return JSON.parse(JSON.stringify(data));
}