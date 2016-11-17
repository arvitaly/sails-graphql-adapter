import Generator from "./../generate/generator";
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
    constructor(public generator: Generator) { }
    public resolve(opts: ResolveOpts) {
        switch (opts.type) {
            case ResolveType.Model:
                return this.resolveOne(opts);
            case ResolveType.ListOfModel:
                break;
            case ResolveType.MutateAndGetPayload:
                return this.mutateAndGetPayload(opts);
            default:
                throw new Error("Unknown resolve type");
        }
    }
    protected async mutateAndGetPayload(opts: ResolveOpts) {
        // TODO 
    }
    protected async resolveOne(opts: ResolveOpts) {
        const args = argsToFind(this.generator.getModel(opts.identity), opts.args);
        const result = (await this.generator.sails.models[opts.identity].find(args));
        if (result) {
            return result[0];
        }
        return null;
    }
    protected async resolveConnection(opts: ResolveOpts): Promise<Connection<any>> {
        throw new Error("Not implemented");
        /*const findParams = argsToFind(this.models[opts.identity], opts.args);
        const result = await sails.models[opts.identity].find(findParams);
        const connection: Connection<any> = {
            edges: result.map((n) => {
                return {
                    cursor: "",
                    node: n,
                };
            }),
            pageInfo: {
                endCursor: "ggg",
                hasNextPage: true,
                hasPreviousPage: true,
                startCursor: "sss",
            },
        };
        return connection;*/
    }
};
