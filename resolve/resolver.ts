import * as Sails from "sails";
import { Models } from "./../typings";
import argsToFind, { FindParams } from "./args-to-find";
import eqRowToFindParams from "./equal-row-to-find-params";
import ResolveOpts from "./ResolveOpts";
import ResolveType from "./ResolveType";
import { GraphQLResolveInfo, graphql, OperationDefinition, SelectionSet } from "graphql";

import mutateAndGetPayloadUpdate from "./mutateAndGetPayloadUpdate";
export default class Resolver {
    public subscribers: { [index: string]: Array<{ args: FindParams; opts: ResolveOpts; ids: Array<Sails.Id> }> } = {};
    constructor(public models: Models, public sailsModels: Sails.Models) {
        for (let modelName in sailsModels) {
            this.subscribers[modelName] = [];
            let oldAfterCreate = sailsModels[modelName].afterCreate;
            sailsModels[modelName].afterCreate = (created, cb) => {
                this.subscribers[modelName].map(async (s) => {
                    if (s.opts.context.request.socket.connected) {
                        if (eqRowToFindParams(s.args, created, modelName, models)) {
                            const row = await this.resolveOne(s.opts);
                            console.log(s.opts.resolveInfo);
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
                return resolveOne(opts);
            case ResolveType.Submodel:
                return resolveSubmodel(opts);
            case ResolveType.ListOfModel:
                return resolveConnection(opts);
            case ResolveType.MutateAndGetPayloadCreate:
                return mutateAndGetPayloadCreate(opts);
            case ResolveType.MutateAndGetPayloadUpdate:
                return mutateAndGetPayloadUpdate(opts, this.models, this.sailsModels);
            case ResolveType.SubscriptionOne:
                return subscribeOne(opts);
            default:
                throw new Error("Unknown resolve type: " + ResolveType[opts.type]);
        }
    }

};
