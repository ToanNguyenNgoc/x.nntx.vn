/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosConfig } from "@/configs"
import { ReqLogin, ReqRegister, Res, ResLogin, ResUser } from "@/interfaces"

export const AuthApi = {
  login: (params: ReqLogin) => AxiosConfig().post('/auth/login', params).then<Res<ResLogin>>(res => res.data),
  loginGoogle: (params: { credential: string }) => AxiosConfig().post('/auth/login/google', params).then<Res<ResLogin>>(res => res.data),
  profile: (token?: any) => AxiosConfig({ argToken: token }).get('/auth/profile').then<Res<ResUser>>(res => res.data),
  register: (params: ReqRegister) => AxiosConfig().post('/auth/register', params).then<Res<ResUser>>(res => res.data),
}