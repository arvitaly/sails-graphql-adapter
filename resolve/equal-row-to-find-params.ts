import { Models } from "./../typings";
import { FindParams } from "./args-to-find";
export default (params: FindParams, row: any, id: string, models: Models): boolean => {
    const model = models[id];
    for (let paramName in params) {
        if (typeof (model.attributes[paramName]) !== "undefined" && params[paramName] !== row[paramName]) {
            return false;
        }
    }
    return true;
};
