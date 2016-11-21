"use strict";
const Sails = require("sails");
const SailsConstructor = Sails.constructor;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (cb) => {
    let app = new SailsConstructor();
    app.lift({
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
        port: 14001,
        routes: {
            "/graphql": "GraphQLController.index",
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
