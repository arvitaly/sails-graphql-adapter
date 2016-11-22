"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (resolveInfo) => {
    const node = resolveInfo.operation.selectionSet.selections[0].selectionSet.selections[0].
        selectionSet.selections[0].selectionSet.selections[0];
    return getFields(node);
};
function getFields(field) {
    let info = { name: field.name.value };
    if (field.selectionSet) {
        info.fields = [];
        field.selectionSet.selections.map((s) => {
            info.fields.push(getFields(s));
        });
    }
    return info;
}
;
function getQueryFragmentFromFieldInfo(info) {
    return info.fields.map((f) => {
        return f.fields ? f.name + "{" + getQueryFragmentFromFieldInfo(f) + "}" : f.name;
    }).join(",");
}
exports.getQueryFragmentFromFieldInfo = getQueryFragmentFromFieldInfo;
