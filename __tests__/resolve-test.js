"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const events_1 = require("events");
const graphql_models_1 = require("graphql-models");
const app1_1 = require("./../__fixtures__/app1");
const app1_models_1 = require("./../__fixtures__/app1-models");
const resolver_1 = require("./../resolver");
describe("Resolver tests", () => {
    let app;
    let callbacks;
    let collection;
    let resolver;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        app = yield app1_1.default();
        callbacks = new events_1.EventEmitter();
        collection = new graphql_models_1.Collection(app1_models_1.default);
        resolver = new resolver_1.default(collection, app, callbacks);
    }));
    afterEach((done) => {
        app.lower(() => { setTimeout(done, 1000); });
    });
    it("resolve query one", () => __awaiter(this, void 0, void 0, function* () {
        const created = yield app1_1.createModel1(app);
        const result = yield resolver.resolve({
            type: graphql_models_1.ResolveTypes.QueryOne,
            model: app1_1.model1Id,
            args: { id: created.id },
            context: { request: {} },
            info: {},
            source: null,
            parentModel: null,
        });
        expect(result).toMatchSnapshot();
    }));
    it("resolve query one with subscribe", () => __awaiter(this, void 0, void 0, function* () {
        const created = yield app1_1.createModel1(app);
        const socketEmit = jest.fn();
        const result = yield resolver.resolve({
            type: graphql_models_1.ResolveTypes.QueryOne,
            model: app1_1.model1Id,
            args: { id: created.id },
            context: {
                request: {
                    headers: { "X-Subscription-Id": 123 }, socket: {
                        emit: socketEmit,
                    },
                },
            },
            info: {},
            source: null,
            parentModel: null,
        });
        expect(result).toMatchSnapshot();
        const updated = yield app.models[app1_1.model1Id].update({ id: created.id }, { title: "test" });
        callbacks.emit("update", updated[0]);
        expect(socketEmit.mock.calls).toMatchSnapshot();
    }));
});
