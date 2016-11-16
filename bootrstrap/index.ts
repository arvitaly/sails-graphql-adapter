import * as fs from 'fs';
import { printSchema, introspectionQuery, graphql } from 'graphql';
import generate from './../generate';
export interface IConfig {
    isPrintSchemaToFile?: boolean;
    isPrintJSONSchemaToFile?: boolean;
    schemaFile?: string;
    jsonSchemaFile?: string;
}
export default (config: IConfig, cb) => {
    config = config || {};
    config.isPrintSchemaToFile = config.isPrintSchemaToFile === false ? false : true;
    config.schemaFile = config.schemaFile || process.cwd() + "/assets/schema.graphql";
    config.isPrintJSONSchemaToFile = config.isPrintJSONSchemaToFile === false ? false : true;
    config.jsonSchemaFile = config.jsonSchemaFile || process.cwd() + "/assets/schema.json";

    const schema = generate(sails.models);
    sails['schema'] = schema;
    //writings
    let promises: Array<Promise<any>> = [];
    if (config.isPrintSchemaToFile) {
        const schemaGraphql = printSchema(schema);
        promises.push((new Promise((resolve, reject) => {
            fs.writeFile(config.schemaFile, schemaGraphql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            })
        })).catch((err) => {
            throw new Error("Error with write graphql schema: " + err);
        }));
    }
    if (config.isPrintJSONSchemaToFile) {
        promises.push(graphql(schema, introspectionQuery).then(jsonSchema => {
            return new Promise((resolve, reject) => {
                fs.writeFile(config.jsonSchemaFile, JSON.stringify(jsonSchema, null, 2), (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            })
        }).catch((err) => {
            throw new Error("Error with write json graphql schema: " + err);
        }));
    }
    Promise.all(promises).then(() => {
        cb();
    }).catch((e) => { cb(e) });
}