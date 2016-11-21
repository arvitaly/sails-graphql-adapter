"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const app1_lift_1 = require("./app1-lift");
const create_model1_1 = require("./create-model1");
const sails_graphql_client_1 = require("sails-graphql-client");
describe("Function tests for subscriptions", () => {
    let sailsClient;
    beforeAll((done) => {
        sailsClient = new sails_graphql_client_1.default({
            address: "http://127.0.0.1:14001",
            path: "/graphql",
        });
        app1_lift_1.default(() => {
            sailsClient.io.socket.on("connect", () => {
                done();
            });
        });
    });
    pit("subsription for single model", () => __awaiter(this, void 0, void 0, function* () {
        let done;
        const donePromise = new Promise((resolve) => {
            done = resolve;
        });
        yield create_model1_1.default();
        yield sailsClient.subscribe(`subscription S1{
            viewer{
                modelName1{
                    name
                    title
                }
            }
        }`)((data) => {
            console.log("new data", data);
        });
        yield sailsClient.request(`mutation M2{
            updateModelName1(input:{where:{id:1} setName:{name:"test"}}){
                modelName1s{
                    _id
                    name
                }
            }
        }`);
        yield sailsClient.request(create_model1_1.mutation());
        return donePromise;
    }));
    it("subsription for connection of model", () => {
        // TODO: create test for subsription connection of model
    });
    it("subsription for count of model", () => {
        // TODO: create test for subsription count of model
    });
    afterAll((done) => {
        sails.lower(done);
    });
});
