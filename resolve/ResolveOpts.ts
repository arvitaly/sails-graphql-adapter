import { IContext } from "./../typings";
import ResolveType from "./ResolveType";
import { GraphQLResolveInfo } from "graphql";
type ResolveOpts = {
    type: ResolveType;
    identity?: string;
    parentIdentity?: string;
    attrName?: string;
    root?;
    args?;
    context?: IContext;
    mutateObject?: any;
    resolveInfo: GraphQLResolveInfo;
}
export default ResolveOpts;