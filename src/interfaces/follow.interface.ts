import { ResUser } from "./auth.interface";
import { ReqPage } from "./base.interface";

export interface ReqFollow extends ReqPage {
  'filter[user_id]'?: number;
  'filter[follower_user_id]'?: number;
  'include'?: string;
  'filter[is_accept]'?: boolean;
}

export interface ReqPostFollow {
  follower_user_id: number
}

export interface ResFollow {
  id: number,
  user_id: number,
  follower_user_id: number,
  is_accept: boolean,
  created_at: string,
  updated_at: string,
  follower_user?:ResUser,
  following_user?:ResUser
}