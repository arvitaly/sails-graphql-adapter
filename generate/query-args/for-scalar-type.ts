import AttributeType from "./../../model/attribute-type";
import { Args } from "./../args";
import argsForBoolean from "./boolean";
import argsForDate from "./date";
import argsForDatetime from "./datetime";
import argsForFloat from "./float";
import argsForInteger from "./integer";
import argsForString from "./string";
export default (argName: string, type: AttributeType): Args => {
    let argsA: Args = [];
    switch (type) {
        case AttributeType.Boolean:
            argsA = argsA.concat(argsForBoolean(argName));
            break;
        case AttributeType.String:
            argsA = argsA.concat(argsForString(argName));
            break;
        case AttributeType.Integer:
            argsA = argsA.concat(argsForInteger(argName));
            break;
        case AttributeType.Float:
            argsA = argsA.concat(argsForFloat(argName));
            break;
        case AttributeType.Date:
            argsA = argsA.concat(argsForDate(argName));
            break;
        case AttributeType.Datetime:
            argsA = argsA.concat(argsForDatetime(argName));
            break;
        default:
            throw new Error("Invalid scalar attr type " + AttributeType[type]);
    }
    return argsA;
};
