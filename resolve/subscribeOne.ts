import { FindParams, Models } from "./../typings";
import prepareResolveOne from "./prepareResolveOne";
import ResolveOpts from "./ResolveOpts";
import * as Sails from "sails";
export default async (opts: ResolveOpts, models: Models, sailsModels: Sails.Models) => {
    const rowInfo = await prepareResolveOne(opts, models, sailsModels);
    if (!rowInfo) {
        return null;
    }

    this.subscribers[opts.identity].push({ opts, ids: [rowInfo.row.id], args: rowInfo.args });
    console.log("OPTS", opts.identity, this.subscribers);
    //this.generator.sails.models[opts.identity].subscribe(opts.context.request, [row._id]);
    //this.generator.sails.models[opts.identity].watch(opts.context.request);

    return rowInfo.row;
}