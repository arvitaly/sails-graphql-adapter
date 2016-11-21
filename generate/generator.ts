import convertModel from "./../model";
import Model from "./../model/model";
import generateCreateMutationType from "./mutations/create-type";
import Resolver from "./resolver";
import generateTypeForModel from "./type";
import { GraphQLInputObjectType, GraphQLObjectType } from "graphql";
import { connectionDefinitions } from "graphql-relay";
class Generator implements Generator {
    public resolver: Resolver;
    public models: { [index: string]: Model } = {};
    protected types: { [index: string]: GraphQLObjectType } = {};
    protected createTypes: { [index: string]: GraphQLInputObjectType } = {};
    protected connectionTypes: { [index: string]: GraphQLObjectType } = {};
    protected sailsModels: Array<Sails.Model>;
    constructor(public sails: Sails.Sails) {
        this.sailsModels = sailsModelsToArray(sails.models);
        this.sailsModels.map((sailsModel) => {
            this.models[sailsModel.identity] = convertModel(sailsModel);
        });
        this.resolver = new Resolver();
    }
    public mapSailsModels(cb) {
        return this.sailsModels.map(cb);
    }
    public getModel(id: string): Model {
        if (!this.models[id]) {
            throw new Error("Not found model with id " + id);
        }
        return this.models[id];
    }
    public getCreateType(id: string) {
        if (!this.createTypes[id]) {
            this.createTypes[id] = generateCreateMutationType(id, this);
        }
        return this.createTypes[id];
    }
    public getConnectionType(name: string): GraphQLObjectType {
        if (!this.connectionTypes[name]) {
            this.connectionTypes[name] = connectionDefinitions({ nodeType: this.getType(name) }).connectionType;
        }
        return this.connectionTypes[name];
    }
    public getType(name: string): GraphQLObjectType {
        const lName = name.toLowerCase();
        if (!this.types[lName]) {
            this.types[lName] = generateTypeForModel(name, this);
        }
        return this.types[lName];
    }
}
function sailsModelsToArray(sailsModels: { [index: string]: Sails.Model }): Array<Sails.Model> {
    let arr = [];
    for (let modelName in sailsModels) {
        arr.push(sailsModels[modelName]);
    }
    return arr;
}
export default Generator;
