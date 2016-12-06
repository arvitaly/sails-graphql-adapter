import { Callbacks, Collection, Resolver, Schema } from "graphql-models";
import Sails = require("sails");
import Adapter from "./adapter";
export { default as Callbacks } from "./callbacks";
export { default as createModels } from "./models";
import createModels from "./models";
export { default as Controller } from "./controller";
import Publisher from "./publisher";
export function getGraphQLSchema(sails: Sails.App, callbacks: Callbacks) {
    const collection = createModels(sails);
    const adapter = new Adapter(sails);
    const publisher = new Publisher();
    const resolver = new Resolver(adapter, callbacks, publisher);
    const schema = new Schema(resolver);
    resolver.setCollection(collection);
    schema.setCollection(collection);
    return schema.getGraphQLSchema();
}
