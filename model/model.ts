import capitalize from "./../utils/capitalize";
import decapitalize from "./../utils/decapitalize";
import Attribute from "./attribute";
import Field from "./field";
class Model {
    public id: string;
    public attributes: Array<Attribute> = [];
    public fields: Array<Field> = [];
    // public associations: Array<Association> = [];
    public name: string;
    public queryName: string;
    public pluralizeQueryName: string;
    public primary: Attribute;
    constructor(sailsModel: Sails.Model) {
        for (let attrName in sailsModel.attributes) {
            let attr = new Attribute(attrName, sailsModel.attributes[attrName]);
            this.attributes.push(attr);
            if (attr.isPrimaryKey) {
                this.primary = attr;
            }
        }
        this.queryName = decapitalize(sailsModel.globalId);
        this.id = sailsModel.identity;
        this.name = sailsModel.globalId;
        this.pluralizeQueryName = this.queryName + "s";
        this.fields = this.attributes.map((attr) => {
            const field = new Field();
            field.name = attr.name;
            field.isPrimaryKey = attr.isPrimaryKey;
            field.isRequired = attr.isRequired;
            field.type = attr.type;
            return field;
        });
    }
    public getAttribute(name: string) {
        return this.attributes.filter(a => a.name === name)[0];
    }
    public getNameWithPrefix(prefix: string) {
        return prefix + capitalize(this.name);
    }
    public getNameWithPostfix(postfix: string) {
        return this.name + postfix;
    }
}
export default Model;
