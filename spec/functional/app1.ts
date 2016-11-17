import * as Sails from "sails";
const SailsConstructor = Sails.constructor;
export default (cb) => {
    let app = new SailsConstructor();
    app.load({
        appPath: __dirname + "/../fixtures/app1",
        connections: {
            memory: {
                adapter: "sails-memory",
            },
        },
        log: {
            level: "warn",
        },
        models: {
            connection: "memory",
            migrate: "drop",
        },
    }, (err, sailsNew) => {
        if (err) {
            console.error(err);
            process.exit(1);
            return;
        }
        cb(null);
    });
};
