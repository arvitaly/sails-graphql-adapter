import { Models } from "./../typings";
import convertRow from "./convertRow";
import generateCreateParams from "./generateCreateParams";
import ResolveOpts from "./resolveOpts";
import * as Sails from "sails";
export default async (opts: ResolveOpts, models: Models, sailsModels: Sails.Models) => {
    const model = models[opts.identity];
    let created = generateCreateParams(opts.identity, opts.mutateObject, models);
    const result = (await sailsModels[opts.identity].create(created));
    let res = {};
    res[model.queryName] = convertRow(model, result);
    sailsModels[opts.identity].publishCreate(result);
    return res;
}