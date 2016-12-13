"use strict";
const graphql_models_1 = require("graphql-models");
class SailsPublisher extends graphql_models_1.Publisher {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SailsPublisher;
