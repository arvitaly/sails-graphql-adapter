"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const graphql_relay_1 = require("graphql-relay");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (model, n) => __awaiter(this, void 0, void 0, function* () {
    n._id = n.id;
    n.id = graphql_relay_1.toGlobalId(model.name, n.id);
    return n;
});
