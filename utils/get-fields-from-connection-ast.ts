import { Field, GraphQLResolveInfo } from "graphql";
export default (resolveInfo: GraphQLResolveInfo) => {
    const node = (resolveInfo.operation.selectionSet as any).selections[0].selectionSet.selections[0].
        selectionSet.selections[0].selectionSet.selections[0];
    return getFields(node);
}
export interface IFieldInfo {
    name: string;
    fields?: Array<IFieldInfo>;
}

function getFields(field: Field): IFieldInfo {
    let info: IFieldInfo = { name: field.name.value };
    if (field.selectionSet) {
        info.fields = [];
        field.selectionSet.selections.map((s: Field) => {
            info.fields.push(getFields(s));
        });
    }
    return info;
};
export function getQueryFragmentFromFieldInfo(info: IFieldInfo) {
    return info.fields.map((f) => {
        return f.fields ? f.name + "{" + getQueryFragmentFromFieldInfo(f) + "}" : f.name;
    }).join(",");
}
