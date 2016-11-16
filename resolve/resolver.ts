import { Connection } from 'graphql-relay';
import ResolveType from './type';
import { Model } from './../model';
import argsToFind from './args-to-find';
interface ResolveOpts {
    type: ResolveType;
    identity?: string;
    parentIdentity?: string;
    attrName?: string;
    root;
    args;
    context;
}
export default class Resolver {
    constructor(public sails: Sails.Sails, public models: { [index: string]: Model }) {

    }
    resolve(opts: ResolveOpts) {
        switch (opts.type) {
            case ResolveType.Model:
                return this.resolveModel(opts)
            case ResolveType.ListOfModel:

        }
    }
    async resolveModel(opts: ResolveOpts) {
        return await sails.models[opts.identity].findOne(argsToFind(this.models[opts.identity], opts.args));
    }
    async resolveListOfModel(opts: ResolveOpts): Promise<Connection<any>> {
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