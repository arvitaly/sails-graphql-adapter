import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
function generate(models: { [index: string]: Waterline.Model }): GraphQLSchema {
    const nodeType = new GraphQLObjectType({
        name: 'NodeType',
        fields: {

        }
    })
    let queries = {};
    let queriesArgs = {};
    for (let modelName in models) {
        let fields = {};
        queries[modelName] = new GraphQLObjectType({
            name: modelName,
            description: modelName,
            fields: fields/*,
            interfaces: [nodeType]*/
        });
        queriesArgs[modelName] = {

        }
        for (let attrName in models[modelName]._attributes) {
            fields[attrName] = new GraphQLObjectType({
                name: attrName,
                description: attrName,
                fields: {

                }
            })
        }
    }

    const queryType = new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'world';
                }
            }
        }
    })
    const schema = new GraphQLSchema({
        query: queryType
    })
    return schema;
}
export default generate;