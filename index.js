"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_models_1 = require("graphql-models");
const adapter_1 = require("./adapter");
var callbacks_1 = require("./callbacks");
exports.Callbacks = callbacks_1.default;
var models_1 = require("./models");
exports.createModels = models_1.default;
const models_2 = require("./models");
var controller_1 = require("./controller");
exports.Controller = controller_1.default;
const publisher_1 = require("./publisher");
function getGraphQLSchemaAndResolver(sails, callbacks) {
    const adapter = new adapter_1.default(sails);
    const publisher = new publisher_1.default();
    const resolver = new graphql_models_1.Resolver(adapter, callbacks, publisher);
    const schema = new graphql_models_1.Schema(resolver);
    const collection = models_2.default(sails, { interfaces: [schema.getNodeDefinition().nodeInterface] });
    collection.map((model) => {
        model.setResolveFn(resolver.resolve.bind(resolver));
    });
    adapter.setCollection(collection);
    resolver.setCollection(collection);
    schema.setCollection(collection);
    return {
        schema: schema.getGraphQLSchema(),
        resolver,
    };
}
exports.default = getGraphQLSchemaAndResolver;
