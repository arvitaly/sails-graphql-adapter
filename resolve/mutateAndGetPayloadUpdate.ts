import { Models } from "./../typings";
import argsToFind from "./argsToFind";
import ResolveOpts from "./ResolveOpts";
import * as Sails from "sails";
export default async (opts: ResolveOpts, models: Models, sailsModels: Sails.Models) => {
    const model = this.models(opts.identity);
    let updated = {};
    const where = argsToFind(models[opts.identity], opts.mutateObject.where || {});
    model.attributes.map((attr) => {
        if (typeof (opts.mutateObject["set" + attr.capitalizeName]) !== "undefined") {
            updated[attr.name] = opts.mutateObject["set" + attr.capitalizeName][attr.name];
        }
    });
    const result = await sailsModels[opts.identity].update(where, updated);
    let res = {};
    res[model.pluralizeQueryName] = result.map((r) => {
        return this.convertRow(model, r);
    });
    return res;
};
