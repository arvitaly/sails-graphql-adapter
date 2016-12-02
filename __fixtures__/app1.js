"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Sails = require("sails");
const SailsConstructor = Sails.constructor;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
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
});
let id = 0;
exports.model1Id = "modelname1";
const dt1 = new Date("Fri Nov 18 2016 18:25:11 GMT+0700 (SE Asia Standard Time)");
function createModel1(sails) {
    ++id;
    const name = "na" + (id);
    return sails.models[exports.model1Id].create({
        firstActive: dt1, id, isActive: false, name, num: 15,
        updatedAt: dt1,
        createdAt: dt1,
    });
}
exports.createModel1 = createModel1;
