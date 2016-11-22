import { Models } from "./../typings";
import argsToFind from "./argsToFind";
import convertRow from "./convertRow";
import ResolveOpts from "./ResolveOpts";
import { Connection } from "graphql-relay";
import * as Sails from "sails";
export default async (opts: ResolveOpts, models: Models, sailsModels: Sails.Models): Promise<Connection<any>> => {
    const model = models[opts.identity];
    const args = argsToFind(model, opts.args);
    const result = (await sailsModels[opts.identity].find(args));
    const connection: Connection<any> = {
        edges: result.map((n) => {

            return {
                cursor: "",
                node: convertRow(model, n),
            };
        }),
        // TODO 
        pageInfo: {
            endCursor: "",
            hasNextPage: true,
            hasPreviousPage: true,
            startCursor: "",
        },
    };
    return connection;
}