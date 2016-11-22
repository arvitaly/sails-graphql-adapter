import { toGlobalId } from "graphql-relay";
export default async (model, n) => {
    n._id = n.id;
    n.id = toGlobalId(model.name, n.id);
    return n;
}