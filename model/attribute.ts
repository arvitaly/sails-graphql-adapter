import capitalize from "./../utils/capitalize";
import AttributeType from "./attribute-type";
export default class Attribute {
    public name: string;
    public capitalizeName: string;
    public type: AttributeType;
    public model?: string;
    public isRequired?: boolean;
    public isPrimaryKey?: boolean;
    constructor(name: string, attr: Waterline.Attribute) {
        let type: string = "";
        let outType: AttributeType = null;
        let model: string = "";
        if (typeof (attr) === "string") {
            type = attr;
        } else {
            type = (attr as Waterline.BaseAttribute).type;
        }
        switch (("" + type).toLowerCase()) {
            case "boolean":
                outType = AttributeType.Boolean;
                break;
            case "email":
            case "mediumtext":
            case "longtext":
            case "json":
            case "string":
                outType = AttributeType.String;
                break;
            case "integer":
            case "int":
                outType = AttributeType.Integer;
                break;
            case "float":
                outType = AttributeType.Float;
                break;
            case "date":
                outType = AttributeType.Date;
                break;
            case "datetime":
                outType = AttributeType.Datetime;
                break;
            default:
        }

        if ((attr as Waterline.ModelAttribute).model) {
            outType = AttributeType.Model;
            model = (attr as Waterline.ModelAttribute).model.toLowerCase();
        }
        if ((attr as Waterline.CollectionAttribute).collection) {
            outType = AttributeType.Collection;
            model = (attr as Waterline.CollectionAttribute).collection.toLowerCase();
        }
        if (outType === null) {
            throw new Error("Unknown sails type for attribute " + JSON.stringify(attr));
        }
        this.isRequired = (attr as Waterline.BaseAttribute).required === true;
        this.model = model;
        this.name = name;
        this.capitalizeName = capitalize(name);
        this.type = outType;
        if ((attr as Waterline.BaseAttribute).primaryKey === true) {
            this.isPrimaryKey = true;
        }
    }
}
