import { AxiosConfig } from "@/configs";
import { ReqMessage, ReqPostMessage, Res, ResMessage, ResPaginate } from "@/interfaces";

export const MessageApi = {
  getMessages: (params: ReqMessage) => AxiosConfig().get('/messages', { params }).then<Res<ResPaginate<ResMessage[]>>>(res => res.data),
  postMessage: (params: ReqPostMessage) => AxiosConfig().post('/messages', params).then<Res<ResMessage>>(res => res.data),
}