import { AxiosConfig } from "@/configs";
import { ReqUser, Res, ResPaginate, ResUser } from "@/interfaces";

export const UserApi = {
  getUsers: (params: ReqUser) => AxiosConfig().get('/users', { params }).then<Res<ResPaginate<ResUser[]>>>(res => res.data),
  getUser: (id: string|number) => AxiosConfig().get(`/users/${id}`).then<Res<ResUser>>(res => res.data),
}