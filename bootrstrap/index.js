"use strict";
const fs = require('fs');
const graphql_1 = require('graphql');
const generate_1 = require('./../generate');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (config, cb) => {
    config = config || {};
    config.isPrintSchemaToFile = config.isPrintSchemaToFile === false ? false : true;
    config.schemaFile = config.schemaFile || process.cwd() + "/assets/schema.graphql";
    config.isPrintJSONSchemaToFile = config.isPrintJSONSchemaToFile === false ? false : true;
    config.jsonSchemaFile = config.jsonSchemaFile || process.cwd() + "/assets/schema.json";
    const schema = generate_1.default(sails);
    sails['schema'] = schema;
    //writings
    let promises = [];
    if (config.isPrintSchemaToFile) {
        const schemaGraphql = graphql_1.printSchema(schema);
        promises.push((new Promise((resolve, reject) => {
            fs.writeFile(config.schemaFile, schemaGraphql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        })).catch((err) => {
            throw new Error("Error with write graphql schema: " + err);
        }));
    }
    if (config.isPrintJSONSchemaToFile) {
        promises.push(graphql_1.graphql(schema, graphql_1.introspectionQuery).then(jsonSchema => {
            return new Promise((resolve, reject) => {
                fs.writeFile(config.jsonSchemaFile, JSON.stringify(jsonSchema, null, 2), (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
        }).catch((err) => {
            throw new Error("Error with write json graphql schema: " + err);
        }));
    }
    Promise.all(promises).then(() => {
        cb();
    }).catch((e) => { cb(e); });
};
