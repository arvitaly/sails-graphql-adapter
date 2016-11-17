import Generator from "./../../generate/generator";
import { Attribute } from "./../../model";
import { Args } from "./../args";
import argsForScalarType from "./for-scalar-type";
export default (attr: Attribute, generator: Generator): Args => {
    const childModel = generator.getModel(attr.model);
    const childKey = childModel.getPrimaryAttribute();
    if (!childKey) {
        throw new Error("Not found primary key for generate args for field " + attr.name);
    }
    return argsForScalarType(attr.name, childKey.type);
};
