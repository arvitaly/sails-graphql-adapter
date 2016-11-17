import { Args } from "./../args";
import { GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
export default (argName: string): Args => {
    let args: Args = [];
    args.push({ field: { type: GraphQLInt }, name: argName });
    args.push({ field: { type: GraphQLInt }, name: argName + "LessThan" });
    args.push({ field: { type: GraphQLInt }, name: argName + "LessThanOrEqual" });
    args.push({ field: { type: GraphQLInt }, name: argName + "GreaterThan" });
    args.push({ field: { type: GraphQLInt }, name: argName + "GreaterThanOrEqual" });
    args.push({ field: { type: new GraphQLList(new GraphQLNonNull(GraphQLInt)) }, name: argName + "In" });
    return args;
};
