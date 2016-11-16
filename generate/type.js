"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const graphql_1 = require('graphql');
const type_1 = require('./../resolve/type');
const attribute_type_1 = require('./../model/attribute-type');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (id, generator) => {
    const model = generator.getModel(id);
    let fields = {};
    model.mapAttributes((attr) => {
        if (attr.type === attribute_type_1.default.Model) {
            fields[attr.name] = {
                type: generator.getType(attr.model),
                resolve: (parent, args, context) => __awaiter(this, void 0, void 0, function* () {
                    return generator.resolver.resolve({
                        attrName: attr.name,
                        type: type_1.default.Submodel,
                        identity: attr.model,
                        parentIdentity: model.id,
                        root: parent,
                        args: args,
                        context: context
                    });
                })
            };
        }
        else {
            let graphqlType;
            switch (attr.type) {
                case attribute_type_1.default.String:
                    graphqlType = graphql_1.GraphQLString;
                    break;
                case attribute_type_1.default.Integer:
                    graphqlType = graphql_1.GraphQLInt;
                    break;
                case attribute_type_1.default.Float:
                    graphqlType = graphql_1.GraphQLFloat;
                    break;
                case attribute_type_1.default.Date:
                    graphqlType = graphql_1.GraphQLString;
                    break;
                case attribute_type_1.default.Datetime:
                    graphqlType = graphql_1.GraphQLString;
                    break;
                default:
                    throw new Error("Not supported type " + attr.type);
            }
            fields[attr.name] = {
                type: graphqlType
            };
        }
    });
    return new graphql_1.GraphQLObjectType({
        name: model.name,
        description: model.name,
        fields: fields,
        interfaces: []
    });
};
