import { Models } from "./../typings";
import convertRow from "./convertRow";
import ResolveOpts from "./ResolveOpts";
import * as Sails from "sails";
export default async (opts: ResolveOpts, models: Models, sailsModels: Sails.Models) => {
    const model = models[opts.identity];
    let where = {};
    where[model.primary.name] = opts.root[opts.attrName];
    const result = (await sailsModels[opts.identity].find(where));
    if (result) {
        return convertRow(model, result[0]);
    }
    return null;
}