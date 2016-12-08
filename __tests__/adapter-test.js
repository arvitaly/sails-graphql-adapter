"use strict";
const graphql_models_1 = require("graphql-models");
const adapter_1 = require("./../adapter");
describe("Adapter test", () => {
    it("findCriteriaWhereToWhere", () => {
        const attr1 = {
            name: "attr1",
            type: graphql_models_1.AttributeTypes.String,
            required: false,
        };
        const attr2 = {
            name: "atrt2",
            type: graphql_models_1.AttributeTypes.Date,
            required: false,
        };
        expect(adapter_1.findCriteriaWhereToWhere({
            where: [{
                    attribute: attr1,
                    graphQLType: null,
                    name: "attr1Contains",
                    type: graphql_models_1.ArgumentTypes.Contains,
                    value: "v1",
                }, {
                    attribute: attr2,
                    graphQLType: null,
                    name: "attr2GreaterThan",
                    type: graphql_models_1.ArgumentTypes.GreaterThan,
                    value: "v2",
                }],
        })).toMatchSnapshot();
    });
});
