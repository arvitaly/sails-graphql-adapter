import prepareResolveOne from "./prepareResolveOne";
import ResolveOpts from "./resolveOpts";
export default async (opts: ResolveOpts) => {
    const result = await prepareResolveOne(opts);
    if (!result) {
        return null;
    }
    return result.row;
}