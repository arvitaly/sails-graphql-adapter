import { GraphQLObjectType } from 'graphql';
import generateTypeForModel from './type';
import convertModel, { Model } from './../model';
import Resolver from './../resolve/resolver';
class Generator implements Generator {
    types: { [index: string]: GraphQLObjectType } = {};
    public resolver: Resolver;
    constructor(sails: Sails.Sails, public models: { [index: string]: Model }) {
        this.resolver = new Resolver(sails, models);
    }
    getModel(id: string): Model {
        return this.models[id];
    }
    getType(name: string): GraphQLObjectType {
        if (!name) {
            throw new Error("Name should be set");
        }
        const lName = name.toLowerCase();
        if (!this.types[lName]) {
            this.types[lName] = generateTypeForModel(this.getModel(name), this);
        }
        return this.types[lName];
    }
}
export default Generator;