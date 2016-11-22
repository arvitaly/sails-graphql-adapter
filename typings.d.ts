import { Request } from "sails";
import Model from "./model/model";
export interface IContext {
    request: Request;
}
export interface Models {
    [name: string]: Model;
}
export type FindParams = {
    where?;
    sort?: string;
    skip?: number;
    limit?: number;
}