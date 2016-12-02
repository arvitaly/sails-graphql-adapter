import * as Sails from "sails";
const SailsConstructor = Sails.constructor;
export default async () => {
    return new Promise<Sails.App>((resolve, reject) => {
        let app = new SailsConstructor();
        app.load({
            appPath: __dirname + "/app1",
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
                reject(err);
                return;
            }
            resolve(sailsNew);
        });
    });
};
