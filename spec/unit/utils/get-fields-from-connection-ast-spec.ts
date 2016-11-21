import generate from "./../../../generate";
import getFieldsFromConnectionAST from "./../../../utils/get-fields-from-connection-ast";
import model1 from "./../../fixtures/model1";
import model2 from "./../../fixtures/model2";
import { GraphQLResolveInfo, graphql } from "graphql";
fdescribe("GetFieldsFromConnectionAST spec", () => {
    pit("simple", async () => {
        const generateInfo = generate({
            models: {
                model1: model1 as any,
                model2: model2 as any,
            }
        });

        const resolveSpy = jasmine.createSpy("");
        generateInfo.bindResolve(resolveSpy);
        const result = await graphql(generateInfo.schema, `query Q1{ 
            viewer{
            modelName1s(name:"test"){ 
                edges{
                    node{
                        title
                        model2Field{ name }
                    }
                }
            }}}`);
        if (result.errors) {
            throw result.errors;
        }
        const resolveInfo: GraphQLResolveInfo = resolveSpy.calls.argsFor(0)[0].resolveInfo;
        console.log(resolveInfo);
    });
})
    ;