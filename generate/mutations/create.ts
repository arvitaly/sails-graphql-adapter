import { Model } from "./../../model";
import { GraphQLFieldConfig, GraphQLInputFieldConfigMap } from "graphql";
// import { mutationWithClientMutationId } from 'graphql-relay';
import capitalize from "./../../utils/capitalize";
export default (model: Model): Array<{ name: string, field: GraphQLFieldConfig<any> }> => {
    const mutationName = "Create" + capitalize(model.name);
    let fields: GraphQLInputFieldConfigMap = {

    };
}