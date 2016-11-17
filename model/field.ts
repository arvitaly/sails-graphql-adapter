import AttributeType from "./attribute-type";
export default class Field {
    public name: string;
    public type: AttributeType;
    public isRequired?: boolean;
    public isPrimaryKey?: boolean;
}
