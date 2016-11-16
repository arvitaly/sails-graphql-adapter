import AttributeType from './attribute-type';
import decapitalize from './../utils/decapitalize';
import convertAttribute from './map-model-attribute';
export interface Attribute {
    name: string;
    type: AttributeType;
    model?: string;
}
export class Model {
    id: string;
    pluralizeQueryName: string;
    name: string;
    queryName: string;
    attrsArray?: Array<Attribute>;
    attributes?: { [index: string]: Attribute };
    mapAttributes<T>(cb: (attr: Attribute) => T): Array<T> {
        return this.attrsArray.map(cb);
    }
    constructor(sailsModel: Sails.Model) {
        this.attributes = {};
        this.attrsArray = [];
        for (let attrName in sailsModel.attributes) {
            this.attributes[attrName] = convertAttribute(attrName, sailsModel.attributes[attrName]);
            this.attrsArray.push(this.attributes[attrName]);
        }
        this.queryName = decapitalize(sailsModel.globalId);
        this.id = sailsModel.identity;
        this.name = sailsModel.globalId;
        this.pluralizeQueryName = this.queryName + "s";
    }
}
export default (sailsModel: Sails.Model): Model => {
    return new Model(sailsModel);
}