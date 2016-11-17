/*import * as Waterline from 'waterline';
import { graphql, GraphQLSchema } from 'graphql';
const sailsMemoryAdapter = require('sails-memory');
import generateSchema from './../generate';
const model2Fix = { id: 3 };
const model1Fix = { name: "Hello", model2Field: 3 };
const model1 = Waterline.Collection.extend({
    identity: "model1",
    connection: "default",
    tableName: "test",
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
interface Model1 {
    name: string;
}
interface Model2 {
}

interface Collections {
    model1: Waterline.Collection;
    model2: Waterline.Collection;
}
describe("Generate schema spec", () => {
    let waterline: Waterline.Waterline, ontology: Waterline.Ontology, schema: GraphQLSchema;
    beforeAll((done) => {
        waterline = new Waterline();
        waterline.loadCollection(model2);
        waterline.loadCollection(model1);
        waterline.initialize({
            adapters: { 'memory': sailsMemoryAdapter },
            connections: { default: { adapter: 'memory' } }
        }, async (err, ontology_) => {
            if (err) {
                fail(err);
                done();
                return;
            }
            const collections: Collections = ontology_.collections;
            await collections.model2.create(model2Fix);
            await collections.model1.create(model1Fix);
            schema = generateSchema(waterline.collections as any);
            done();
        })

    })
    it("when query single model without args should return selected fields", async (done) => {
        const results = await graphql(schema, `query Q1 {model1{name}}`);
        expect(j(results.data)).toEqual({ model1: { name: model1Fix.name } });
        done();
    })
    it("when query list of model without args should return array", async (done) => {
        const results = await graphql(schema, `query Q1 {model1s{name}}`);
        expect(j(results.data)).toEqual({ model1s: [{ name: model1Fix.name }] });
        done();
    })
    it("when call create mutation model should be added", async (done) => {
        const results = await graphql(schema,
        `mutation M1 {updateModel1(input:{clientMutationId:"1", id: 1,
        setName:{name:"test"} } ){clientMutationId,model1{name} } }`);
        expect(j(results.data)).toEqual({ updateModel1: { clientMutationId: "1", model1: { name: "test" } } });
        done();
    })
    it("when query single model without args should return selected fields", async (done) => {
        const results = await graphql(schema, `query Q1 {model1{model2Field{id}}}`);
        expect(j(results.data)).toEqual({ model1: { model2Field: { id: model2Fix.id } } });
        done();
    })
})

function j(data) {
    return JSON.parse(JSON.stringify(data));
}*/
