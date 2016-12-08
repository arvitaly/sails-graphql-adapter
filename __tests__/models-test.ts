import Sails = require("sails");
import { start } from "sails-fixture-app";
import convert from "./../models";
describe("Model tests", () => {
    let app: Sails.App;
    beforeEach(async () => {
        app = await start(__dirname + "/../__fixtures__/app1");
    });
    afterEach((done) => {
        app.lower(done);
    });
    it("model", () => {
        const models = convert(app);
        expect(models).toMatchSnapshot();
    });
});
