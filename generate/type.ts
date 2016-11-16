import { GraphQLFieldConfigMap, GraphQLObjectType } from 'graphql';
import Generator from './generator';
import capitalize from './../utils/capitalize';
import AttributeType from './attribute-type';
import mapAttrs from './map-model-attributes';
export default (model: Sails.Model, generator: Generator) => {
    let fields: GraphQLFieldConfigMap<any> = {};
    mapAttrs(model.attributes).map(({name, type, graphqlType, attribute}) => {
        if (graphqlType !== null) {
            fields[name] = {
                args: {},
                type: graphqlType,
                deprecationReason: "",
                description: name
            }
        } else {
            switch (type) {
                case AttributeType.Model:
                    let childModelName = (attribute as Waterline.ModelAttribute).model;
                    fields[name] = {
                        args: {},
                        type: generator.getType(childModelName),
                        deprecationReason: "",
                        description: name,
                        resolve: async (parent, b, c) => {
                            return (await generator.models[childModelName].findById(parent[name]))[0];
                        }
                    }
                    break;
            }
        }
    })
    return new GraphQLObjectType({
        name: model.globalId,
        description: model.globalId,
        fields: fields,
        interfaces: []
    })
}