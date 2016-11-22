import { FindParams, Models } from "./../typings";
import argsToFind from "./argsToFind";
import convertRow from "./convertRow";
import ResolveOpts from "./resolveOpts";
import * as Sails from "sails";

export default async (
    opts: ResolveOpts,
    models: Models,
    sailsModels: Sails.Models
): Promise<{ row: any; args: FindParams }> => {
    const model = models[opts.identity];
    const args = argsToFind(model, opts.args);
    const result = (await sailsModels[opts.identity].find(args));
    if (result) {
        return { row: convertRow(model, result[0]), args }
    }
    return null;
};
