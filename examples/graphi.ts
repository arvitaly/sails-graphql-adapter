import Controller from './../controller';
import generate from './../generate';
import * as Waterline from 'waterline';
import * as express from 'express';
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
})
const waterline = new Waterline<any>();
waterline.loadCollection(model2);
waterline.loadCollection(model1);
waterline.initialize({
    adapters: { 'memory': sailsMemoryAdapter },
    connections: { default: { adapter: 'memory' } }
}, async (err, ontology) => {
    if (err) {
        throw err;
    }
    await ontology.collections.model2.create(model2Fix);
    await ontology.collections.model1.create(model1Fix);
    const schema = generate(waterline.collections as any);
    const app = express();
    app.use('/graphql', Controller(schema).index);
    app.listen(4000);
})