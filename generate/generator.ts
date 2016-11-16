import { GraphQLObjectType } from 'graphql';
import generateTypeForModel from './type';
class Generator implements Generator {
    types: { [index: string]: GraphQLObjectType } = {};
    constructor(public models: { [index: string]: Sails.Model }) {

    }
    getType(name: string): GraphQLObjectType {
        if (!name) {
            throw new Error("Name should be set");
        }
        const lName = name.toLowerCase();
        if (!this.types[lName]) {
            this.types[lName] = generateTypeForModel(this.models[name], this);
        }
        return this.types[lName];
    }
}
export default Generator;