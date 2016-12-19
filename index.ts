import { Callbacks, Collection, Resolver, Schema } from "graphql-models";
import Sails = require("sails");
import Adapter from "./adapter";
export { default as Callbacks } from "./callbacks";
export { default as createModels } from "./models";
import createModels from "./models";
export { default as Controller } from "./controller";
import Publisher from "./publisher";
export default function getGraphQLSchemaAndResolver(sails: Sails.App, callbacks: Callbacks) {
    const collection = createModels(sails);
    const adapter = new Adapter(sails, collection);
    const publisher = new Publisher();
    const resolver = new Resolver(adapter, callbacks, publisher);
    collection.map((model) => {
        model.setResolveFn(resolver.resolve.bind(resolver));
    });
    const schema = new Schema(resolver);
    resolver.setCollection(collection);
    schema.setCollection(collection);
    return {
        schema: schema.getGraphQLSchema(),
        resolver,
    };
}
