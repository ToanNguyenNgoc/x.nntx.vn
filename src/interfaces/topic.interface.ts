import { ResUser } from "./auth.interface"
import { ReqPage } from "./base.interface"
import { ResMessage } from "./message.interface"

export type TopicType = 'DUOS' | 'GROUP'

export interface ReqTopic extends ReqPage {
  include?: string,
  sort?: string,
}

export interface ReqPostTopic {
  recipient_ids: number[],
  name?: string,
  type: TopicType
}
//
export interface ResTopic {
  id: number,
  name: string,
  type: TopicType,
  deleted_at: null | string,
  created_at: string,
  updated_at: string,
  users: ResUser[],
  last_message: ResMessage | null
}