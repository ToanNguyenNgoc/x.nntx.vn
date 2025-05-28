import { AxiosConfig } from "@/configs";
import { ReqPostTopic, ReqTopic, Res, ResPaginate, ResTopic } from "@/interfaces";

export const TopicApi = {
  getTopics: (params: ReqTopic) => AxiosConfig().get('/topics', { params }).then<Res<ResPaginate<ResTopic[]>>>(res => res.data),
  getTopic: (id: number, params?: ReqTopic) => AxiosConfig().get(`/topics/${id}`, { params }).then<Res<ResTopic>>(res => res.data),
  post: (params: ReqPostTopic) => AxiosConfig().post('/topics', params).then<Res<ResTopic>>(res => res.data),
}