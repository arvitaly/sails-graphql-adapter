import { ModelID, Publisher, SubscriptionID } from "graphql-models";
import { GlobalID, ILiveAddMessage, ILiveUpdateMessage } from "sails-graphql-interfaces";
import Sails = require("sails");
type Context = {
    request: Sails.Request;
};
class SailsPublisher extends Publisher {
    public publishAdd(subscriptionId: SubscriptionID, modelId: ModelID, globalId: GlobalID, added, context: Context) {
        const message: ILiveAddMessage = {
            kind: "add",
            globalId,
            id: subscriptionId,
            data: added,
        };
        context.request.socket.emit("live", message);
    }
    public publishRemove(
        subscriptionId: SubscriptionID, modelId: ModelID, globalId: GlobalID,
        removed, context: Context) {
        context.request.socket.emit("subscription-" + subscriptionId, {
            type: "remove",
            modelId,
            data: removed,
        });
    }
    public publishUpdate(
        subscriptionId: SubscriptionID, modelId: ModelID, globalId: GlobalID,
        updated, context: Context) {
        const message: ILiveUpdateMessage = {
            data: updated,
            globalId,
            id: subscriptionId,
            kind: "update",
        };
        context.request.socket.emit("live", message);
    }
}
export default SailsPublisher;
