import { GraphQLFieldConfigArgumentMap, GraphQLString } from 'graphql';
export default function (model: Waterline.Model<any>): GraphQLFieldConfigArgumentMap {
    let args: GraphQLFieldConfigArgumentMap = {};
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
                args[attrName] = {
                    type: GraphQLString,
                    defaultValue: null,
                    description: attrName
                }
                args[attrName + "Contains"] = {
                    type: GraphQLString,
                    defaultValue: null,
                    description: attrName
                }
                break;
        }
    }
    return args;
}