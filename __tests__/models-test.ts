import Sails = require("sails");
import start from "sails-fixture-app/start";
import convert from "./../models";
describe("Model tests", () => {
    let app: Sails.App;
    beforeEach(async() => {
        app = await start();
    });
    afterEach((done) => {
        app.lower(done);
    });
    it("model", () => {
        const models = convert(app);
        expect(models).toMatchSnapshot();
    });
});
