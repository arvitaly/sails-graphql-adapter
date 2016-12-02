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
                level: "error",
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
let id = 0;
export const model1Id = "modelname1";
const dt1 = new Date("Fri Nov 18 2016 18:25:11 GMT+0700 (SE Asia Standard Time)");
export function createModel1(sails: Sails.App) {
    ++id;
    const name = "na" + Math.random();
    return sails.models[model1Id].create({ firstActive: dt1, id, isActive: false, name, num: 15 });
}
