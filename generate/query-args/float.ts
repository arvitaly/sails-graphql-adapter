import { Args } from "./../args";
import { GraphQLFloat, GraphQLList, GraphQLNonNull } from "graphql";
export default (argName: string): Args => {
    let args: Args = [];
    args.push({ field: { type: GraphQLFloat }, name: argName });
    args.push({ field: { type: GraphQLFloat }, name: argName + "LessThan" });
    args.push({ field: { type: GraphQLFloat }, name: argName + "LessThanOrEqual" });
    args.push({ field: { type: GraphQLFloat }, name: argName + "GreaterThan" });
    args.push({ field: { type: GraphQLFloat }, name: argName + "GreaterThanOrEqual" });
    args.push({ field: { type: new GraphQLList(new GraphQLNonNull(GraphQLFloat)) }, name: argName + "In" });
    return args;
};
