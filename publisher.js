"use strict";
const graphql_models_1 = require("graphql-models");
class SailsPublisher extends graphql_models_1.Publisher {
    publishAdd(subscriptionId, modelId, added, context) {
        context.request.emit("subscription-" + subscriptionId, {
            type: "add",
            modelId,
            data: added,
        });
    }
    publishRemove(subscriptionId, modelId, removed, context) {
        context.request.emit("subscription-" + subscriptionId, {
            type: "remove",
            modelId,
            data: removed,
        });
    }
    publishUpdate(subscriptionId, modelId, updated, context) {
        context.request.emit("subscription-" + subscriptionId, {
            type: "update",
            modelId,
            data: updated,
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SailsPublisher;
