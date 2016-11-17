"use strict";
var ResolveType;
(function (ResolveType) {
    ResolveType[ResolveType["Model"] = 0] = "Model";
    ResolveType[ResolveType["ListOfModel"] = 1] = "ListOfModel";
    ResolveType[ResolveType["Submodel"] = 2] = "Submodel";
    ResolveType[ResolveType["MutateAndGetPayloadCreate"] = 3] = "MutateAndGetPayloadCreate";
    ResolveType[ResolveType["MutateAndGetPayloadUpdate"] = 4] = "MutateAndGetPayloadUpdate";
    ResolveType[ResolveType["MutateAndGetPayloadDestroy"] = 5] = "MutateAndGetPayloadDestroy";
})(ResolveType || (ResolveType = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResolveType;
