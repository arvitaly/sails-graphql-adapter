import { ArgumentTypes, AttributeTypes } from "graphql-models";
import { findCriteriaWhereToWhere } from "./../adapter";
describe("Adapter test", () => {
    it("findCriteriaWhereToWhere", () => {
        const attr1 = {
            name: "attr1",
            type: AttributeTypes.String,
            required: false,
        };
        const attr2 = {
            name: "atrt2",
            type: AttributeTypes.Date,
            required: false,
        };
        expect(findCriteriaWhereToWhere({
            where: [{
                attribute: attr1,
                graphQLType: null,
                name: "attr1Contains",
                type: ArgumentTypes.Contains,
                value: "v1",
            }, {
                attribute: attr2,
                graphQLType: null,
                name: "attr2GreaterThan",
                type: ArgumentTypes.GreaterThan,
                value: "v2",
            }],
        })).toMatchSnapshot();
    });
});
