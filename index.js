"use strict";
const graphql_models_1 = require("graphql-models");
var callbacks_1 = require("./callbacks");
exports.Callbacks = callbacks_1.default;
var models_1 = require("./models");
exports.createModels = models_1.default;
var resolver_1 = require("./resolver");
exports.Resolver = resolver_1.default;
var controller_1 = require("./controller");
exports.Controller = controller_1.default;
function getGraphQLSchema(collection, resolver) {
    return new graphql_models_1.Schema(collection, resolver.resolve.bind(resolver)).getGraphQLSchema();
}
exports.getGraphQLSchema = getGraphQLSchema;
