import { Args } from "./../args";
import { GraphQLBoolean } from "graphql";
export default (argName: string): Args => {
    let args: Args = [];
    args.push({ field: { type: GraphQLBoolean }, name: argName });
    return args;
};
