import AttributeType from './attribute-type';
import decapitalize from './../utils/decapitalize';
import convertAttribute from './map-model-attribute';
export interface Attribute {
    name: string;
    type: AttributeType;
    model?: string;
}
export interface Model {
    id: string;
    pluralizeQueryName: string;
    name: string;
    queryName: string;
    attributes?: { [index: string]: Attribute };
    mapAttributes<T>(cb: (attr: Attribute) => T): Array<T>
}
export default (sailsModel: Sails.Model): Model => {
    let attributes = {};
    let attrsArray = [];
    for (let attrName in sailsModel.attributes) {
        attributes[attrName] = convertAttribute(attrName, sailsModel.attributes[attrName]);
        attrsArray.push(attributes[attrName]);
    }
    const queryName = decapitalize(sailsModel.globalId);
    let model = {
        id: sailsModel.identity,
        name: sailsModel.globalId,
        queryName: queryName,
        pluralizeQueryName: queryName + "s",
        attributes: attributes,
        mapAttributes: attrsArray.map.bind(attrsArray)
    };
    return model;
}