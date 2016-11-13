import { GraphQLObjectType } from 'graphql';
import generateTypeForModel from './generate-type-for-model';
interface Generator {
    types: { [index: string]: GraphQLObjectType };
    getType(name: string): GraphQLObjectType;
    models: { [index: string]: Waterline.Model<any> };
}
class Generator implements Generator {
    constructor(public models: { [index: string]: Waterline.Model<any> }) {
        this.types = {};
    }
    getType(name: string) {
        if (!name) {
            throw new Error("Name should be set");
        }
        const lName = name.toLowerCase();
        if (!this.types[lName]) {
            this.types[lName] = generateTypeForModel(name, this.models[name], this);
        }
        return this.types[lName];
    }
}
export default Generator;