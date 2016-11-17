import capitalize from "./../utils/capitalize";
import decapitalize from "./../utils/decapitalize";
import AttributeType from "./attribute-type";
import convertAttribute from "./map-model-attribute";
export type Attribute = {
    name: string;
    type: AttributeType;
    model?: string;
    isRequired?: boolean;
    isPrimaryKey?: boolean;
}
export class Model {
    public id: string;
    public pluralizeQueryName: string;
    public name: string;
    public queryName: string;
    public attributes?: { [index: string]: Attribute };
    private attrsArray?: Array<Attribute>;
    private primaryAttribute: Attribute;
    constructor(sailsModel: Sails.Model) {
        this.attributes = {};
        this.attrsArray = [];
        for (let attrName in sailsModel.attributes) {
            this.attributes[attrName] = convertAttribute(attrName, sailsModel.attributes[attrName]);
            this.attrsArray.push(this.attributes[attrName]);
            if (this.attributes[attrName].isPrimaryKey) {
                this.primaryAttribute = this.attributes[attrName];
            }
        }
        if (!this.primaryAttribute) {
            // tslint:disable:no-string-literal
            this.primaryAttribute = this.attributes["id"];
        }
        this.queryName = decapitalize(sailsModel.globalId);
        this.id = sailsModel.identity;
        this.name = sailsModel.globalId;
        this.pluralizeQueryName = this.queryName + "s";
    }
    public getPrimaryAttribute() {
        return this.primaryAttribute;
    }
    public getNameWithPrefix(prefix: string) {
        return prefix + capitalize(this.name);
    }
    public getNameWithPostfix(postfix: string) {
        return this.name + postfix;
    }
    public mapAttributes<T>(cb: (attr: Attribute) => T): Array<T> {
        return this.attrsArray.map(cb);
    }
}
export default (sailsModel: Sails.Model): Model => {
    return new Model(sailsModel);
};
