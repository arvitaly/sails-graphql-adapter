import { graphql } from 'graphql';
import * as Sails from 'sails';
import generate from './../../generate'
const SailsConstructor = Sails.constructor;
describe("Generate functional tests", () => {
    let sails: Sails.Sails, app: Sails.App;
    beforeAll((done) => {
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
            const schema = generate(sails.models);
            graphql(schema, `query Q1 {model1{name}}`).catch((err) => {
                fail(err);
                done();
            })
        } catch (e) {
            fail(e);
            done()
        }
    })
    afterAll((done) => {
        if (sails) {
            app.lower(done);
        } else {
            done();
        }
    })
})