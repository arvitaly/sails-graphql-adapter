import { GraphQLFieldConfigMap, GraphQLObjectType } from 'graphql';
import Generator from './generator';
import capitalize from './capitalize';
import AttributeType from './attribute-type';
import mapAttrs from './map-model-attributes';
export default (modelName: string, model: Waterline.Model<any>, generator: Generator) => {
    console.log(modelName, model._attributes);
    let fields: GraphQLFieldConfigMap<any> = {};
    mapAttrs(model._attributes).map(({name, type, graphqlType, attribute}) => {
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
        name: capitalize(modelName),
        description: modelName,
        fields: fields,
        interfaces: []
    })
}