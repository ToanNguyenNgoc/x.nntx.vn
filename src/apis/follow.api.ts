import { AxiosConfig } from "@/configs";
import { ReqFollow, ReqPostFollow, Res, ResFollow, ResPaginate } from "@/interfaces";

export const FollowApi = {
  getFollows: (params?: ReqFollow) => AxiosConfig().get('/follows', { params }).then<Res<ResPaginate<ResFollow[]>>>(res => res.data),
  postFollow: (params: ReqPostFollow) => AxiosConfig().post('/follows', params).then<Res<ResFollow>>(res => res.data),
  deleteFollow: (userId: number) => AxiosConfig().delete(`/follows/${userId}`).then(res => res.data),
}