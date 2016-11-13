"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const controller_1 = require('./../controller');
const generate_1 = require('./../generate');
const Waterline = require('waterline');
const express = require('express');
const sailsMemoryAdapter = require('sails-memory');
const model1Fix = { name: "Hello", model2Field: 3 };
const model2Fix = { id: 3 };
const model1 = Waterline.Collection.extend({
    identity: "model1",
    connection: "default",
    attributes: {
        name: "string",
        description: {
            type: "string"
        },
        model2Field: {
            model: "model2"
        }
    }
});
const model2 = Waterline.Collection.extend({
    identity: "model2",
    connection: "default"
});
const waterline = new Waterline();
waterline.loadCollection(model2);
waterline.loadCollection(model1);
waterline.initialize({
    adapters: { 'memory': sailsMemoryAdapter },
    connections: { default: { adapter: 'memory' } }
}, (err, ontology) => __awaiter(this, void 0, void 0, function* () {
    if (err) {
        throw err;
    }
    yield ontology.collections.model2.create(model2Fix);
    yield ontology.collections.model1.create(model1Fix);
    const schema = generate_1.default(waterline.collections);
    const app = express();
    app.use('/graphql', controller_1.default(schema).index);
    app.listen(4000);
}));
