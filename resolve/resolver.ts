import { Model } from "./../model";
import argsToFind from "./args-to-find";
import ResolveType from "./type";
import { Connection } from "graphql-relay";
type ResolveOpts = {
    type: ResolveType;
    identity?: string;
    parentIdentity?: string;
    attrName?: string;
    root?;
    args?;
    context?;
    mutateObject?: any;
}
export default class Resolver {
    constructor(public sails: Sails.Sails, public models: { [index: string]: Model }) {

    }
    public resolve(opts: ResolveOpts) {
        switch (opts.type) {
            case ResolveType.Model:
                return this.resolveModel(opts)
            case ResolveType.ListOfModel:
                break;
            case ResolveType.MutateAndGetPayload:
                return this.mutateAndGetPayload(opts);
            default:
                throw new Error("Unknown resolve type");
        }
    }
    protected async mutateAndGetPayload(opts: ResolveOpts) {

    }
    protected async resolveModel(opts: ResolveOpts) {
        const result = (await sails.models[opts.identity].find(argsToFind(this.models[opts.identity], opts.args)));
        if (result) {
            return result[0];
        }
        return null;
    }
    protected async resolveListOfModel(opts: ResolveOpts): Promise<Connection<any>> {
        const findParams = argsToFind(this.models[opts.identity], opts.args);
        const result = await sails.models[opts.identity].find(findParams);
        const connection: Connection<any> = {
            edges: result.map((n) => {
                return {
                    node: n,
                    cursor: ""
                }
            }),
            pageInfo: {
                hasNextPage: true,
                hasPreviousPage: true,
                startCursor: "sss",
                endCursor: "ggg"
            }
        };
        return connection;
    }
} 