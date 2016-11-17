import Generator from "./../../generate/generator";
import Attribute from "./../../model/attribute";
import { Args } from "./../args";
import argsForScalarType from "./for-scalar-type";
export default (attr: Attribute, generator: Generator): Args => {
    const childModel = generator.getModel(attr.model);
    if (!childModel.primary) {
        throw new Error("Not found primary key for generate args for field " + attr.name);
    }
    return argsForScalarType(attr.name, childModel.primary.type);
};
