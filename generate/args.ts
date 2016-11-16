import { GraphQLFieldConfigArgumentMap, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import { Model } from './../model';
import AttributeType from './../model/attribute-type';
export default function (model: Model): GraphQLFieldConfigArgumentMap {
    let args: GraphQLFieldConfigArgumentMap = {};
    model.mapAttributes((attr) => {
        switch (attr.type) {
            case AttributeType.String:
                args[attr.name] = {
                    type: GraphQLString,
                    defaultValue: null,
                    description: attr.name
                }
                args[attr.name + "Contains"] = {
                    type: GraphQLString,
                    defaultValue: null,
                    description: attr.name
                }
                args[attr.name + "StartsWith"] = {
                    type: GraphQLString,
                    defaultValue: null,
                    description: attr.name
                }
                args[attr.name + "EndsWith"] = {
                    type: GraphQLString,
                    defaultValue: null,
                    description: attr.name
                }
                args[attr.name + "Like"] = {
                    type: GraphQLString,
                    defaultValue: null,
                    description: attr.name
                }
                args[attr.name + "In"] = {
                    defaultValue: null,
                    description: attr.name,
                    type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
                }
                break;
        }
    })
    return args;
}