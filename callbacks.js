"use strict";
const events_1 = require("events");
class Callbacks extends events_1.EventEmitter {
    constructor(sails) {
        super();
        this.sails = sails;
        Object.keys(sails.models).map((modelName) => {
            const oldAfterCreate = sails.models[modelName].afterCreate;
            sails.models[modelName].afterCreate = (created, cb) => {
                if (oldAfterCreate) {
                    oldAfterCreate(created, () => {
                        this.emit("created", created);
                        cb();
                    });
                }
                else {
                    this.emit("created", created);
                    cb();
                }
            };
            const oldAfterUpdate = sails.models[modelName].afterUpdate;
            sails.models[modelName].afterUpdate = (updated, cb) => {
                if (oldAfterUpdate) {
                    oldAfterUpdate(updated, () => {
                        this.emit("updated", updated);
                        cb();
                    });
                }
                else {
                    this.emit("updated", updated);
                    cb();
                }
            };
            const oldAfterDestroy = sails.models[modelName].afterDestroy;
            sails.models[modelName].afterDestroy = (destroyed, cb) => {
                if (oldAfterDestroy) {
                    oldAfterDestroy(destroyed, () => {
                        this.emit("destroyed", destroyed);
                        cb();
                    });
                }
                else {
                    this.emit("destroyed", destroyed);
                    cb();
                }
            };
        });
    }
}
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Callbacks;
