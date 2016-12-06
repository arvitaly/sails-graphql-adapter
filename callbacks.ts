import { EventEmitter } from "events";
import { Callbacks } from "graphql-models";
import Sails = require("sails");
class SailsCallbacks extends EventEmitter implements Callbacks {
    constructor(private sails: Sails.App) {
        super();
        Object.keys(sails.models).map((modelName) => {
            const oldAfterCreate = sails.models[modelName].afterCreate;
            sails.models[modelName].afterCreate = (created, cb) => {
                if (oldAfterCreate) {
                    oldAfterCreate(created, () => {
                        this.emit(modelName + "created", created);
                        cb();
                    });
                } else {
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
                } else {
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
                } else {
                    this.emit(modelName + "destroyed", destroyed);
                    cb();
                }
            };
        });
    }
    public onUpdate(modelId: string, cb: (updated) => any) {
        this.on(modelId + "updated", cb);
    }
    public onCreate(modelId: string, cb: (updated) => any) {
        this.on(modelId + "created", cb);
    }
    public onDelete(modelId: string, cb: (updated) => any) {
        this.on(modelId + "destroyed", cb);
    }
};
export default Callbacks;
