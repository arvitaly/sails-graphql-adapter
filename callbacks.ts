import { EventEmitter } from "events";
import Sails = require("sails");
class Callbacks extends EventEmitter {
    constructor(private sails: Sails.App) {
        super();
        Object.keys(sails.models).map((modelName) => {
            const oldAfterCreate = sails.models[modelName].afterCreate;
            sails.models[modelName].afterCreate = (created, cb) => {
                oldAfterCreate(created, () => {
                    this.emit("created", created);
                    cb();
                });
            };
            const oldAfterUpdate = sails.models[modelName].afterUpdate;
            sails.models[modelName].afterCreate = (updated, cb) => {
                oldAfterUpdate(updated, () => {
                    this.emit("updated", updated);
                    cb();
                });
            };
            const oldAfterDestroy = sails.models[modelName].afterDestroy;
            sails.models[modelName].afterDestroy = (destroyed, cb) => {
                oldAfterDestroy(destroyed, () => {
                    this.emit("destroyed", destroyed);
                    cb();
                });
            };
        });
    }
};
export default Callbacks;
