"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SailsPublisher {
    publishAdd(subscriptionId, modelId, globalId, added, context) {
        const message = {
            kind: "add",
            globalId,
            id: subscriptionId,
            data: added,
        };
        context.request.socket.emit("live", message);
    }
    publishRemove(subscriptionId, modelId, globalId, removed, context) {
        context.request.socket.emit("subscription-" + subscriptionId, {
            type: "remove",
            modelId,
            data: removed,
        });
    }
    publishUpdate(subscriptionId, modelId, globalId, updated, context) {
        const message = {
            data: updated,
            globalId,
            id: subscriptionId,
            kind: "update",
        };
        context.request.socket.emit("live", message);
    }
}
exports.default = SailsPublisher;
