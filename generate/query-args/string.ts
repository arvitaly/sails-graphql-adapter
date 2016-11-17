import { Args } from "./../args";
import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
export default (argName: string): Args => {
    let args: Args = [];
    args.push({ field: { type: GraphQLString }, name: argName });
    args.push({ field: { type: GraphQLString }, name: argName + "Contains" });
    args.push({ field: { type: GraphQLString }, name: argName + "StartsWith" });
    args.push({ field: { type: GraphQLString }, name: argName + "EndsWith" });
    args.push({ field: { type: GraphQLString }, name: argName + "Like" });
    args.push({ field: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }, name: argName + "In" });
    return args;
};
