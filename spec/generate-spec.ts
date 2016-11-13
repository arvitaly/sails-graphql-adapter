import * as Waterline from 'waterline';
import { graphql } from 'graphql';
const sailsMemoryAdapter = require('sails-memory');
import generateSchema from './../generate';
const model1Fix = { name: "Hello" };
const model1 = Waterline.Collection.extend({
    identity: "model1",
    connection: "default",
    attributes: {
        name: "string"
    }
})
interface IModel1Props {
    name: string;
}
interface IModel1 extends Waterline.Model<IModel1Props> {

}
interface IModels {
    model1: IModel1
}
describe("Generate schema spec", () => {
    let waterline: Waterline.Waterline<IModels>, ontology: Waterline.Ontology<IModels>;
    beforeAll((done) => {
        waterline = new Waterline<IModels>();
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
            ontology = ontology_;
            await ontology.collections.model1.create(model1Fix);
            done();
        })

    })
    it("when query single model without args should return selected fields", async (done) => {
        const schema = generateSchema(waterline.collections as any);
        const results = await graphql(schema, `query Q1 {model1{name}}`);
        expect(j(results.data)).toEqual({ model1: { name: model1Fix.name } });
        done();
    })
    it("when query list of model without args should return array", async (done) => {
        const schema = generateSchema(waterline.collections as any);
        const results = await graphql(schema, `query Q1 {model1s{name}}`);
        expect(j(results.data)).toEqual({ model1s: [{ name: model1Fix.name }] });
        done();
    })
})

function j(data) {
    return JSON.parse(JSON.stringify(data));
}