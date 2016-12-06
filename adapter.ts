import { Adapter, FindCriteria } from "graphql-models";
import Sails = require("sails");
class SailsAdapter {
    constructor(protected app: Sails.App) { }
    public findOne(modelId: string, id: any) {
        return this.app.models[modelId].findOne(id);
    }
    public findMany(modelId: string, findCriteria: FindCriteria): any[] {
        throw new Error("Not implemented findMany");
    }
    public hasNextPage(modelId: string, findCriteria: FindCriteria): boolean {
        throw new Error("Not implemented hasNextPage");
    }
    public hasPreviousPage(modelId: string, findCriteria: FindCriteria): boolean {
        throw new Error("Not implemented hasPreviousPage");
    }
    public populate(modelId: string, attr: string): any[] {
        throw new Error("Not implemented populate");
    }
}
export default SailsAdapter;
