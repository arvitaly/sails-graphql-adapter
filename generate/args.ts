import { GraphQLFieldConfigArgumentMap, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
export default function (model: Sails.Model): GraphQLFieldConfigArgumentMap {
    let args: GraphQLFieldConfigArgumentMap = {};
    for (let attrName in model.attributes) {
        let attr = model.attributes[attrName];
        let type: string;
        if (typeof (attr) === "string") {
            type = attr;
        } else {
            type = (attr as Waterline.BaseAttribute).type;
        }
        switch (type) {
            case "string":
                args[attrName] = {
                    type: new GraphQLNonNull(GraphQLString),
                    defaultValue: null,
                    description: attrName
                }
                args[attrName + "Contains"] = {
                    type: new GraphQLNonNull(GraphQLString),
                    defaultValue: null,
                    description: attrName
                }
                args[attrName + "StartsWith"] = {
                    type: new GraphQLNonNull(GraphQLString),
                    defaultValue: null,
                    description: attrName
                }
                args[attrName + "EndsWith"] = {
                    type: new GraphQLNonNull(GraphQLString),
                    defaultValue: null,
                    description: attrName
                }
                args[attrName + "Like"] = {
                    type: new GraphQLNonNull(GraphQLString),
                    defaultValue: null,
                    description: attrName
                }
                args[attrName + "In"] = {
                    defaultValue: null,
                    description: attrName,
                    type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
                }
                break;
        }
    }
    return args;
}