import { ReqPage } from "./base.interface";

export interface ReqUser extends ReqPage {
  'filter[keyword]'?: string;
  sort?: string
}