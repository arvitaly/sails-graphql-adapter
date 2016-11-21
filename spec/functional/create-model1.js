"use strict";
const dt1 = new Date("Fri Nov 18 2016 18:25:11 GMT+0700 (SE Asia Standard Time)");
const model1Name = "modelname1";
let id = 0;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    ++id;
    const name = "na" + Math.random();
    return sails.models[model1Name].create({ firstActive: dt1, id, isActive: false, name, num: 15 });
};
function mutation() {
    ++id;
    const name = "na" + Math.random();
    const num = parseInt("" + (Math.random() * 1000), 0);
    return `mutation M1{
            createModelName1(input: {
                id: ${id}, 
                num: ${num}, 
                isActive: false, 
                firstActive: "${dt1}", 
                name:  "${name}" }){
                modelName1{
                    name
                }
            }
        }`;
}
exports.mutation = mutation;
;
