import Generator from "./../generate/generator";
import argsToFind from "./args-to-find";
import ResolveType from "./type";
import { Connection, toGlobalId } from "graphql-relay";
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
        res[model.pluralizeQueryName] = result.map((r) => {
            return this.convertRow(model, r);
        });
        return res;
    }
    protected generateCreateParams(modelId: string, createParams) {
        const model = this.generator.getModel(modelId);
        let created = Object.assign({}, createParams);
        model.attributes.map((attr) => {
            if (typeof (createParams["create" + attr.capitalizeName]) !== "undefined") {
                created[attr.name] = this.generateCreateParams(
                    attr.model,
                    createParams["create" + attr.capitalizeName]);
                delete created["create" + attr.capitalizeName];
            }
        });
        return created;
    }
    protected async mutateAndGetPayloadCreate(opts: ResolveOpts) {
        const model = this.generator.getModel(opts.identity);
        let created = this.generateCreateParams(opts.identity, opts.mutateObject);
        const result = (await this.generator.sails.models[opts.identity].create(created));
        let res = {};
        res[model.queryName] = this.convertRow(model, result);
        return res;
    }
    protected async resolveSubmodel(opts: ResolveOpts) {
        const model = this.generator.getModel(opts.identity);
        let where = {};
        where[model.primary.name] = opts.root[opts.attrName];
        const result = (await this.generator.sails.models[opts.identity].find(where));
        if (result) {
            return this.convertRow(model, result[0]);
        }
        return null;
    }
    protected async resolveOne(opts: ResolveOpts) {
        const model = this.generator.getModel(opts.identity);
        const args = argsToFind(model, opts.args);
        const result = (await this.generator.sails.models[opts.identity].find(args));
        if (result) {
            return this.convertRow(model, result[0]);
        }
        return null;
    }
    protected convertRow(model, n) {
        n.id = toGlobalId(model.name, n.id);
        return n;
    }
    protected async resolveConnection(opts: ResolveOpts): Promise<Connection<any>> {
        const model = this.generator.getModel(opts.identity);
        const args = argsToFind(model, opts.args);
        const result = (await this.generator.sails.models[opts.identity].find(args));
        const connection: Connection<any> = {
            edges: result.map((n) => {

                return {
                    cursor: "",
                    node: this.convertRow(model, n),
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
