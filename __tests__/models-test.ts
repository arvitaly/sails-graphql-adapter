import Sails = require("sails");
import app1 from "./../__fixtures__/app1";
import convert from "./../models";
xdescribe("Model tests", () => {
    let app: Sails.App;
    beforeEach(async () => {
        app = await app1();
    });
    afterEach((done) => {
        app.lower(done);
    });
    it("model", () => {
        const models = convert(app);
        expect(models).toMatchSnapshot();
    });
});
