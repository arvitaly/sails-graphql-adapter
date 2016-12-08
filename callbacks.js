"use strict";
const events_1 = require("events");
class SailsCallbacks extends events_1.EventEmitter {
    constructor(sails) {
        super();
        this.sails = sails;
        Object.keys(sails.models).map((modelName) => {
            const oldAfterCreate = sails.models[modelName].afterCreate;
            sails.models[modelName].afterCreate = (created, cb) => {
                const z = Math.random();
                if (oldAfterCreate) {
                    oldAfterCreate(created, () => {
                        this.emit(modelName + "created", created);
                        cb();
                    });
                }
                else {
                    this.emit(modelName + "created", created);
                    cb();
                }
            };
            const oldAfterUpdate = sails.models[modelName].afterUpdate;
            sails.models[modelName].afterUpdate = (updated, cb) => {
                if (oldAfterUpdate) {
                    oldAfterUpdate(updated, () => {
                        this.emit(modelName + "updated", updated);
                        cb();
                    });
                }
                else {
                    this.emit(modelName + "updated", updated);
                    cb();
                }
            };
            const oldAfterDestroy = sails.models[modelName].afterDestroy;
            sails.models[modelName].afterDestroy = (destroyed, cb) => {
                if (oldAfterDestroy) {
                    oldAfterDestroy(destroyed, () => {
                        this.emit(modelName + "destroyed", destroyed);
                        cb();
                    });
                }
                else {
                    this.emit(modelName + "destroyed", destroyed);
                    cb();
                }
            };
        });
    }
    onUpdate(modelId, cb) {
        this.on(modelId + "updated", cb);
    }
    onCreate(modelId, cb) {
        this.on(modelId + "created", cb);
    }
    onDelete(modelId, cb) {
        this.on(modelId + "destroyed", cb);
    }
}
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SailsCallbacks;
