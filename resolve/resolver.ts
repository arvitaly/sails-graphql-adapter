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
            case ResolveType.Submodel:
                return this.resolveSubmodel(opts);
            case ResolveType.ListOfModel:
                return this.resolveConnection(opts);
            case ResolveType.MutateAndGetPayloadCreate:
                return this.mutateAndGetPayloadCreate(opts);
            case ResolveType.MutateAndGetPayloadUpdate:
                return this.mutateAndGetPayloadUpdate(opts);
            default:
                throw new Error("Unknown resolve type: " + ResolveType[opts.type]);
        }
    }
    protected async mutateAndGetPayloadUpdate(opts: ResolveOpts) {
        const model = this.generator.getModel(opts.identity);
        let updated = {};
        const where = argsToFind(this.generator.getModel(opts.identity), opts.mutateObject.where || {});
        model.attributes.map((attr) => {
            if (typeof (opts.mutateObject["set" + attr.capitalizeName]) !== "undefined") {
                updated[attr.name] = opts.mutateObject["set" + attr.capitalizeName][attr.name];
            }
        });
        const result = await this.generator.sails.models[opts.identity].update(where, updated);
        let res = {};
        res[model.pluralizeQueryName] = result;
        return res;
    }
    protected async mutateAndGetPayloadCreate(opts: ResolveOpts) {
        const model = this.generator.getModel(opts.identity);
        let created = Object.assign({}, opts.mutateObject);
        model.attributes.map((attr) => {
            if (typeof (opts.mutateObject["create" + attr.capitalizeName]) !== "undefined") {
                created[attr.name] = opts.mutateObject["create" + attr.capitalizeName];
                delete created["create" + attr.capitalizeName];
            }
        });
        const result = (await this.generator.sails.models[opts.identity].create(created));
        let res = {};
        res[model.queryName] = result;
        return res;
    }
    protected async resolveSubmodel(opts: ResolveOpts) {
        const model = this.generator.getModel(opts.identity);
        let where = {};
        where[model.primary.name] = opts.root[opts.attrName];
        const result = (await this.generator.sails.models[opts.identity].find(where));
        if (result) {
            return result[0];
        }
        return null;
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
        const args = argsToFind(this.generator.getModel(opts.identity), opts.args);
        const result = (await this.generator.sails.models[opts.identity].find(args));
        const connection: Connection<any> = {
            edges: result.map((n) => {
                return {
                    cursor: "",
                    node: n,
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
};
