"use strict";
const type_1 = require("./../resolve/type");
const args_1 = require("./args");
function generateQueryForModel(id, generator) {
    const model = generator.getModel(id);
    const modelType = generator.getType(model.id);
    return [{
            field: {
                args: args_1.default(id, generator),
                resolve: (root, args, context, resolveInfo) => {
                    return generator.resolver.resolve({
                        args,
                        attrName: null,
                        context,
                        identity: model.id,
                        parentIdentity: null,
                        resolveInfo,
                        root,
                        type: type_1.default.SubscriptionOne,
                    });
                },
                type: modelType,
            },
            name: model.queryName,
        }, {
            field: {
                args: args_1.default(id, generator),
                resolve: (root, args, context) => {
                    return generator.resolver.resolve({
                        args,
                        attrName: null,
                        context,
                        identity: model.id,
                        parentIdentity: null,
                        root,
                        type: type_1.default.SubscriptionConnection,
                    });
                },
                type: generator.getConnectionType(model.id),
            },
            name: model.pluralizeQueryName,
        }];
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateQueryForModel;
