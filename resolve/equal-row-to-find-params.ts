import Generator from "./../generate/generator";
import { FindParams } from "./args-to-find";
export default (params: FindParams, row: any, id: string, generator: Generator): boolean => {
    const model = generator.getModel(id);
    for (let paramName in params) {
        if (typeof (model.attributes[paramName]) !== "undefined" && params[paramName] !== row[paramName]) {
            return false;
        }
    }
    return true;
};
