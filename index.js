"use strict";
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
function getGraphQLSchema(sails, callbacks) {
    const collection = models_2.default(sails);
    const adapter = new adapter_1.default(sails);
    const publisher = new publisher_1.default();
    const resolver = new graphql_models_1.Resolver(adapter, callbacks, publisher);
    collection.map((model) => {
        model.setResolveFn(resolver.resolve.bind(resolver));
    });
    const schema = new graphql_models_1.Schema(resolver);
    resolver.setCollection(collection);
    schema.setCollection(collection);
    return schema.getGraphQLSchema();
}
exports.getGraphQLSchema = getGraphQLSchema;
