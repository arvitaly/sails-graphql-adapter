import { Args } from "./../args";
import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
export default (argName: string): Args => {
    let args: Args = [];
    args.push({ field: { type: GraphQLString }, name: argName });
    args.push({ field: { type: GraphQLString }, name: argName + "LessThan" });
    args.push({ field: { type: GraphQLString }, name: argName + "LessThanOrEqual" });
    args.push({ field: { type: GraphQLString }, name: argName + "GreaterThan" });
    args.push({ field: { type: GraphQLString }, name: argName + "GreaterThanOrEqual" });
    args.push({ field: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }, name: argName + "In" });
    return args;
};
