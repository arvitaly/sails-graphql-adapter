import { EventEmitter } from "events";
import { Collection, ResolveTypes } from "graphql-models";
import Sails = require("sails");
import { createModel1, model1Id, start as startApp } from "sails-fixture-app";
import models1 from "./../__fixtures__/app1-models";
import Resolver from "./../resolver";

describe("Resolver tests", () => {
    let app: Sails.App;
    let callbacks: EventEmitter;
    let collection: Collection;
    let resolver: Resolver;
    beforeEach(async () => {
        app = await startApp(__dirname + "/../__fixtures__/app1");
        callbacks = new EventEmitter();
        collection = new Collection(models1);
        resolver = new Resolver(collection, app, callbacks);
    });
    afterEach((done) => {
        app.lower(() => { setTimeout(done, 1000); });
    });
    it("resolve query one", async () => {
        const created = await createModel1(app);
        const result = await resolver.resolve({
            type: ResolveTypes.QueryOne,
            model: model1Id,
            args: { id: created.id },
            context: { request: {} as any, subscriptionId: null },
            info: {} as any,
            source: null,
            parentModel: null,
        });
        expect(result).toMatchSnapshot();
    });
    it("resolve query one with subscribe", async () => {
        const created = await createModel1(app);
        const socketEmit = jest.fn();
        const result = await resolver.resolve({
            type: ResolveTypes.QueryOne,
            model: model1Id,
            args: { id: created.id },
            context: {
                subscriptionId: "123",
                request: {
                    socket: {
                        emit: socketEmit,
                    },
                } as any,
            },
            info: {} as any,
            source: null,
            parentModel: null,
        });
        expect(result).toMatchSnapshot();
        created.title = "newTitle";
        callbacks.emit("updated", created);
        expect(socketEmit.mock.calls).toMatchSnapshot();
    });
});
