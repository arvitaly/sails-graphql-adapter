import { ModelID, Publisher, SubscriptionID } from "graphql-models";
import Sails = require("sails");
type Context = {
    request: Sails.Request;
};
class SailsPublisher extends Publisher {
    public publishAdd(subscriptionId: SubscriptionID, modelId: ModelID, added, context: Context) {
        context.request.emit("subscription-" + subscriptionId, {
            type: "add",
            modelId,
            data: added,
        });
    }
    public publishRemove(subscriptionId: SubscriptionID, modelId: ModelID, removed, context: Context) {
        context.request.emit("subscription-" + subscriptionId, {
            type: "remove",
            modelId,
            data: removed,
        });
    }
    public publishUpdate(subscriptionId: SubscriptionID, modelId: ModelID, updated, context: Context) {
        context.request.emit("subscription-" + subscriptionId, {
            type: "update",
            modelId,
            data: updated,
        });
    }
}
export default SailsPublisher;
