import { GraphQLFieldConfigMap, GraphQLObjectType } from 'graphql';
import capitalize from './capitalize';
import mapAttrs from './map-model-attributes';
export default (name: string, model: Waterline.Model<any>) => {
    let fields: GraphQLFieldConfigMap<any> = {};
    mapAttrs(model._attributes).map(({name, type, graphqlType}) => {
        fields[name] = {
            args: {},
            type: graphqlType,
            deprecationReason: "",
            description: name
        }
    })

    return new GraphQLObjectType({
        name: capitalize(name),
        description: name,
        fields: fields,
        interfaces: []
    })
}