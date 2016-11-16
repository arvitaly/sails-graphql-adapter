import { GraphQLFieldConfigArgumentMap, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import { Model } from './../model';
import AttributeType from './../model/attribute-type';
export default function (model: Model): GraphQLFieldConfigArgumentMap {
    let args: GraphQLFieldConfigArgumentMap = {};
    model.mapAttributes((attr) => {
        switch (attr.type) {
            case AttributeType.String:
                args[attr.name] = { type: GraphQLString }
                args[attr.name + "Contains"] = { type: GraphQLString }
                args[attr.name + "StartsWith"] = { type: GraphQLString }
                args[attr.name + "EndsWith"] = { type: GraphQLString }
                args[attr.name + "Like"] = { type: GraphQLString }
                args[attr.name + "In"] = { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }
                break;
            case AttributeType.Integer:
                args[attr.name + "In"] = { type: new GraphQLList(new GraphQLNonNull(GraphQLInt)) }
                break;
        }
    })
    return args;
}