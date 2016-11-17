import { GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLNonNull, GraphQLInt, GraphQLFloat, GraphQLInputFieldConfigMap, GraphQLInputObjectType, GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import Generator from './generator';
import AttributeType from './../model/attribute-type';
import capitalize from './../utils/capitalize';
export default (id: string, generator: Generator): Array<{ name: string, field: GraphQLFieldConfig<any> }> => {
    const model = generator.getModel(id);
    const modelType = generator.getType(model.id);
    let mutations: Array<{ name: string, field: GraphQLFieldConfig<any> }> = [];
    const updateMutationName = "MutationUpdate" + capitalize(model.name);
    let updateMutationInputFields: GraphQLInputFieldConfigMap = {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    };
    let updateMutationOutputFields: GraphQLFieldConfigMap<any> = {};
    model.mapAttributes((attr) => {
        let fields: GraphQLInputFieldConfigMap = {

        };
        switch (attr.type) {
            case AttributeType.String:
                fields[attr.name] = { type: GraphQLString };
                break;
            case AttributeType.Integer:
                fields[attr.name] = { type: GraphQLInt };
                break;
            case AttributeType.Float:
                fields[attr.name] = { type: GraphQLFloat };
                break;
        }
        updateMutationInputFields["set" + capitalize(attr.name)] = {
            type: new GraphQLInputObjectType({
                name: updateMutationName + "Set" + capitalize(name),
                description: model.name,
                fields: fields
            })
        }
    })
    updateMutationOutputFields[model.queryName] = {
        type: modelType
    };
    const updateMutation: GraphQLFieldConfig<any> = mutationWithClientMutationId({
        inputFields: updateMutationInputFields,
        mutateAndGetPayload: async (args): Promise<any> => {
            /*let outputModel = {};
            mapAttrs(model._attributes).map(({name, type, graphqlType}) => {
                const setName = "set" + capitalize(name);
                if (typeof (args[setName]) !== "undefined") {
                    outputModel[name] = args[setName][name];
                }
            })
            const results = await model.update({ where: { id: args.id } }, outputModel);
            let ret = { clientMutationId: args.clientMutationId };
            ret[modelName] = results[0];
            return ret;*/
        },
        name: updateMutationName,
        outputFields: updateMutationOutputFields
    })
    mutations.push({
        name: "update" + capitalize(model.name),
        field: updateMutation
    })
updateMutation.type
    return mutations;
}