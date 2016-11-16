import AttributeType from './attribute-type';
import decapitalize from './../utils/decapitalize';
import convertAttribute from './map-model-attribute';
export interface Attribute {
    type: AttributeType;
}
export interface Model {
    id: string;
    pluralizeQueryName: string;
    name: string;
    queryName: string;
    attributes?: { [index: string]: Attribute };
}
export default (sailsModel: Sails.Model): Model => {
    let attributes = {};
    for (let attrName in sailsModel.attributes) {
        attributes[attrName] = convertAttribute(sailsModel.attributes[attrName]);
    }
    const queryName = decapitalize(sailsModel.globalId);
    let model = {
        id: sailsModel.identity,
        name: sailsModel.globalId,
        queryName: queryName,
        pluralizeQueryName: queryName + "s",
        attributes: attributes
    };
    return model;
}