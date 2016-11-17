import Generator from "./generator";
import createMutation from "./mutations/create";
import { GraphQLFieldConfig } from "graphql";
export default (id: string, generator: Generator): Array<{ name: string, field: GraphQLFieldConfig<any> }> => {
    let mutations: Array<{ name: string, field: GraphQLFieldConfig<any> }> = createMutation(id, generator);
    return mutations;
};
