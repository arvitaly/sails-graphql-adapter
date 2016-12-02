import { EventEmitter } from "events";
import Sails = require("sails");
import SocketIO = require("socket.io");
import { Collection, ResolveOpts as ModelsResolveOpts, ResolveTypes } from "graphql-models";
export type ResolveOpts = ModelsResolveOpts & {
    context: {
        request: Sails.Request;
    };
};
class Resolver {
    constructor(private models: Collection, private sails: Sails.App, protected callbacks: EventEmitter) {
    }
    public resolve(opts: ResolveOpts) {
        switch (opts.type) {
            case ResolveTypes.QueryOne:
                return this.resolveQueryOne(opts);
            default:
                throw new Error("Unsupported resolve types");
        }
    }
    private async resolveQueryOne(opts: ResolveOpts) {
        const model = this.models.get(opts.model);
        const primaryAttrName = model.getPrimaryKeyAttribute().name;
        // opts.context.request
        const result = await this.sails.models[opts.model].findOne(opts.args[primaryAttrName]);
        if (opts.context.request.isSocket) {
            const socket: SocketIO.Socket = opts.context.request.socket;
            this.callbacks.on("update", (updated) => {
                if (updated[primaryAttrName] === opts.args[primaryAttrName]) {
                    socket.emit("update", updated);
                }
            });
        }
        return result;
    }
}
export default Resolver;
