/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResUser } from "./auth.interface";
import { ReqPage } from "./base.interface";

export interface ReqMessage extends ReqPage {
  topic_id: number;
  sort?: string;
  include?: string
}

export interface ReqPostMessage{
  topic_id:number;
  body?:string;
  media_ids:number[];
  reply_id?:number
}

export interface ResMessage {
  id: number,
  body: string,
  topic_id: number,
  user_id: number,
  reply_id: null | number,
  deleted_at: null | string,
  created_at: string,
  updated_at: string,
  media_urls: string[],
  user: ResUser,
  favorite_count?: number,
  is_favorite?: boolean,
  reply?:any,
  favorites?:any[]
}