"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const generate_1 = require("./../../../generate");
const model1_1 = require("./../../fixtures/model1");
const model2_1 = require("./../../fixtures/model2");
const graphql_1 = require("graphql");
fdescribe("GetFieldsFromConnectionAST spec", () => {
    pit("simple", () => __awaiter(this, void 0, void 0, function* () {
        const generateInfo = generate_1.default({
            models: {
                model1: model1_1.default,
                model2: model2_1.default,
            }
        });
        const resolveSpy = jasmine.createSpy("");
        generateInfo.bindResolve(resolveSpy);
        const result = yield graphql_1.graphql(generateInfo.schema, `query Q1{ 
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
        const resolveInfo = resolveSpy.calls.argsFor(0)[0].resolveInfo;
        console.log(resolveInfo);
    }));
});
