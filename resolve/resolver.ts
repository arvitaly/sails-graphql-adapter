import Generator from "./../generate/generator";
import { IContext } from "./../typings";
import argsToFind, { FindParams } from "./args-to-find";
import eqRowToFindParams from "./equal-row-to-find-params";
import ResolveType from "./type";
import { Connection, toGlobalId } from "graphql-relay";
type ResolveOpts = {
    type: ResolveType;
    identity?: string;
    parentIdentity?: string;
    attrName?: string;
    root?;
    args?;
    context?: IContext;
    mutateObject?: any;
}
export default class Resolver {
    public subscribers: { [index: string]: Array<{ args: FindParams; opts: ResolveOpts; ids: Array<Sails.Id> }> } = {};
    constructor(public generator: Generator) {
        for (let modelName in this.generator.sails.models) {
            this.subscribers[modelName] = [];
            let oldAfterCreate = this.generator.sails.models[modelName].afterCreate;
            this.generator.sails.models[modelName].afterCreate = (created, cb) => {
                this.subscribers[modelName].map(async (s) => {
                    if (s.opts.context.request.socket.connected) {
                        if (eqRowToFindParams(s.args, created, modelName, this.generator)) {
                            const row = await this.resolveOne(s.opts);
                            s.opts.context.request.socket.emit(modelName, <Sails.WebSocketCreateEvent<any>>{
                                data: row,
                                id: row._id,
                                verb: "created",
                            });
                        }
                    }
                });
                if (oldAfterCreate) {
                    oldAfterCreate(created, cb);
                } else {
                    cb();
                }
            }
        }
        //afterUpdate
        //afterCreate
        //afterDestroy

    }
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
            case ResolveType.SubscriptionOne:
                return this.subscribeOne(opts);
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
            this.generator.sails.models[model.id].publishUpdate(r.id, r);
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
        this.generator.sails.models[opts.identity].publishCreate(result);
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
    protected async subscribeOne(opts: ResolveOpts) {
        const rowInfo = await this._resolveOne(opts);
        if (!rowInfo) {
            return null;
        }

        this.subscribers[opts.identity].push({ opts, ids: [rowInfo.row.id], args: rowInfo.args });
        console.log("OPTS", opts.identity, this.subscribers);
        //this.generator.sails.models[opts.identity].subscribe(opts.context.request, [row._id]);
        //this.generator.sails.models[opts.identity].watch(opts.context.request);

        return rowInfo.row;
    }
    protected async resolveOne(opts: ResolveOpts) {
        const result = await this._resolveOne(opts);
        if (!result) {
            return null;
        }
        return result.row;
    }
    protected async _resolveOne(opts: ResolveOpts): Promise<{ row: any; args: FindParams }> {
        const model = this.generator.getModel(opts.identity);
        const args = argsToFind(model, opts.args);
        const result = (await this.generator.sails.models[opts.identity].find(args));
        if (result) {
            return { row: this.convertRow(model, result[0]), args }
        }
        return null;
    }
    protected convertRow(model, n) {
        n._id = n.id;
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
