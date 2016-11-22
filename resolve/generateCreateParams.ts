import { Models } from "./../typings";
const generateCreateParams = (modelId: string, createParams, models: Models) => {
    const model = models[modelId];
    let created = Object.assign({}, createParams);
    model.attributes.map((attr) => {
        if (typeof (createParams["create" + attr.capitalizeName]) !== "undefined") {
            created[attr.name] = generateCreateParams(
                attr.model,
                createParams["create" + attr.capitalizeName], models);
            delete created["create" + attr.capitalizeName];
        }
    });
    return created;
};
export default generateCreateParams;

