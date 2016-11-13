import { GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import generateArgsForModel from './generate-args-for-model';
export default function generateQueryForModel(name: string, model: Waterline.Model<any>): Array<{ name: string, field: GraphQLFieldConfig<any> }> {
    let fields: GraphQLFieldConfigMap<any> = {};
    for (let attrName in model._attributes) {
        let attr = model._attributes[attrName];
        let type: string;
        if (typeof (attr) === "string") {
            type = attr;
        } else {
            type = (attr as Waterline.BaseAttribute).type;
        }
        switch (type) {
            case "string":
                fields[attrName] = {
                    args: {},
                    type: GraphQLString,
                    deprecationReason: "",
                    description: attrName
                }
        }
    }
    const modelType = new GraphQLObjectType({
        name: name.charAt(0).toUpperCase() + name.substr(1),
        description: name,
        fields: fields,
        interfaces: []
    })
    return [{
        name: name,
        field: {
            args: generateArgsForModel(model),
            description: name,
            deprecationReason: "",
            resolve: async (parent, args, context) => {
                return (await model.find({ limit: 1 }))[0];
            },
            type: modelType
        }
    }, {
        name: name + "s",
        field: {
            args: generateArgsForModel(model),
            description: name,
            deprecationReason: "",
            resolve: async (parent, args, context) => {
                return (await model.find({}));
            },
            type: new GraphQLList(modelType)
        }
    }]
}