import app1 from "./app1-lift";
import createModel1, { mutation } from "./create-model1";
import Client from "sails-graphql-client";
fdescribe("Function tests for subscriptions", () => {
    let sailsClient: Client;
    beforeAll((done) => {
        sailsClient = new Client({
            address: "http://127.0.0.1:14001",
            path: "/graphql",
        });
        app1(() => {
            sailsClient.io.socket.on("connect", () => {
                done();
            });
        });
    });
    pit("subsription for single model", async () => {
        let done;
        const donePromise = new Promise((resolve) => {
            done = resolve;
        });

        await createModel1();
        await sailsClient.subscribe(`subscription S1{
            viewer{
                modelName1{
                    name
                }
            }
        }`)((data) => {
                console.log("new data", data);
            });
        await sailsClient.request(`mutation M2{
            updateModelName1(input:{where:{id:1} setName:{name:"test"}}){
                modelName1s{
                    _id
                    name
                }
            }
        }`);
        await sailsClient.request(mutation());
        return donePromise;
    });
    it("subsription for connection of model", () => {
        // TODO: create test for subsription connection of model
    });
    it("subsription for count of model", () => {
        // TODO: create test for subsription count of model
    });
    afterAll((done) => {
        sails.lower(done);
    })
});
