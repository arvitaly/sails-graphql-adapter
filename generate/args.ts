import Generator from "./../generate/generator";
import AttributeType from "./../model/attribute-type";
import argsForScalarType from "./query-args/for-scalar-type";
import argsForModel from "./query-args/model";
import { GraphQLArgumentConfig, GraphQLFieldConfigArgumentMap } from "graphql";
export type Args = Array<{ name: string, field: GraphQLArgumentConfig }>;
export default function (id: string, generator: Generator): GraphQLFieldConfigArgumentMap {
    const model = generator.getModel(id);
    let argsA: Args = [];
    model.attributes.map((attr) => {
        if (attr.type === AttributeType.Model) {
            argsA = argsA.concat(argsForModel(attr, generator));
        } else {
            argsA = argsA.concat(argsForScalarType(attr.name, attr.type));
        }
    });
    let args: GraphQLFieldConfigArgumentMap = {};
    argsA.map((arg) => {
        args[arg.name] = arg.field;
    });
    return args;
};
