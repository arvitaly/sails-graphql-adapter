import { GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLNonNull, GraphQLInt, GraphQLInputFieldConfigMap, GraphQLInputObjectType, GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import Generator from './generator';
import capitalize from './../utils/capitalize';
import mapAttrs from './map-model-attributes';
export default (model: Sails.Model, generator: Generator): Array<{ name: string, field: GraphQLFieldConfig<any> }> => {
    const modelType = generator.getType(model.identity);
    let mutations: Array<{ name: string, field: GraphQLFieldConfig<any> }> = [];
    const updateMutationName = "MutationUpdate" + capitalize(modelName);
    let updateMutationInputFields: GraphQLInputFieldConfigMap = {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    };
    let updateMutationOutputFields: GraphQLFieldConfigMap<any> = {};
    mapAttrs(model._attributes).map(({name, type, graphqlType}) => {
        if (!graphqlType) {
            return;
        }
        let fields: GraphQLInputFieldConfigMap = {

        };
        fields[name] = {
            type: graphqlType
        }
        updateMutationInputFields["set" + capitalize(name)] = {
            type: new GraphQLInputObjectType({
                name: updateMutationName + "Set" + capitalize(name),
                description: modelName,
                fields: fields
            })
        }
    })
    updateMutationOutputFields[modelName] = {
        type: modelType
    };
    const updateMutation: GraphQLFieldConfig<any> = mutationWithClientMutationId({
        inputFields: updateMutationInputFields,
        mutateAndGetPayload: async (args): Promise<any> => {
            let outputModel = {};
            mapAttrs(model._attributes).map(({name, type, graphqlType}) => {
                const setName = "set" + capitalize(name);
                if (typeof (args[setName]) !== "undefined") {
                    outputModel[name] = args[setName][name];
                }
            })
            const results = await model.update({ where: { id: args.id } }, outputModel);
            let ret = { clientMutationId: args.clientMutationId };
            ret[modelName] = results[0];
            return ret;
        },
        name: updateMutationName,
        outputFields: updateMutationOutputFields
    })
    mutations.push({
        name: "update" + capitalize(modelName),
        field: updateMutation
    })

    return mutations;
}