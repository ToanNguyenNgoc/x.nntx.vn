/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosConfig } from "@/configs"

export const AuthApi = {
  login: (params: any) => AxiosConfig().post('/auth/login', params).then(res => res.data),
  profile: (token?: any) => AxiosConfig({ argToken: token }).get('/auth/profile').then(res => res.data),
}