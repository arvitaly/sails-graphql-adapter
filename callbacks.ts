import { EventEmitter } from "events";
import Sails = require("sails");
class Callbacks extends EventEmitter {
    constructor(private sails: Sails.App) {
        super();
        Object.keys(sails.models).map((modelName) => {
            const oldAfterCreate = sails.models[modelName].afterCreate;
            sails.models[modelName].afterCreate = (created, cb) => {
                if (oldAfterCreate) {
                    oldAfterCreate(created, () => {
                        this.emit("created", created);
                        cb();
                    });
                } else {
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
                } else {
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
                } else {
                    this.emit("destroyed", destroyed);
                    cb();
                }
            };
        });
    }
};
export default Callbacks;
