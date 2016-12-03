import { Collection, Schema } from "graphql-models";
export { default as Callbacks } from "./callbacks";
export { default as createModels } from "./models";
export { default as Resolver } from "./resolver";
import { default as Resolver } from "./resolver";
export {default as Controller} from "./controller";
export function getGraphQLSchema(collection: Collection, resolver: Resolver) {
    return new Schema(collection, resolver.resolve.bind(resolver)).getGraphQLSchema();
}
