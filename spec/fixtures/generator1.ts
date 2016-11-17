import Generator from "./../../generate/generator";
import model1 from "./model1";
import model2 from "./model2";
export default new Generator({
    models: {
        model2: model2 as any,
        modelname1: model1 as any,
    },
});
