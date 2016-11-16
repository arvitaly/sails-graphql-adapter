import { GraphQLFieldConfigArgumentMap, GraphQLString, GraphQLList, GraphQLFloat, GraphQLNonNull, GraphQLInt } from 'graphql';
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
                args[attr.name] = { type: GraphQLInt }
                args[attr.name + "LessThan"] = { type: GraphQLInt }
                args[attr.name + "LessThanOrEqual"] = { type: GraphQLInt }
                args[attr.name + "GreaterThan"] = { type: GraphQLInt }
                args[attr.name + "GreaterThanOrEqual"] = { type: GraphQLInt }
                args[attr.name + "In"] = { type: new GraphQLList(new GraphQLNonNull(GraphQLInt)) }
                break;
            case AttributeType.Float:
                args[attr.name] = { type: GraphQLFloat }
                args[attr.name + "LessThan"] = { type: GraphQLFloat }
                args[attr.name + "LessThanOrEqual"] = { type: GraphQLFloat }
                args[attr.name + "GreaterThan"] = { type: GraphQLFloat }
                args[attr.name + "GreaterThanOrEqual"] = { type: GraphQLFloat }
                args[attr.name + "In"] = { type: new GraphQLList(new GraphQLNonNull(GraphQLFloat)) }
                break;
            case AttributeType.Date:
            case AttributeType.Datetime:
                args[attr.name] = { type: GraphQLString }
                args[attr.name + "LessThan"] = { type: GraphQLString }
                args[attr.name + "LessThanOrEqual"] = { type: GraphQLString }
                args[attr.name + "GreaterThan"] = { type: GraphQLString }
                args[attr.name + "GreaterThanOrEqual"] = { type: GraphQLString }
                args[attr.name + "In"] = { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }
                break;                
        }
    })
    return args;
}