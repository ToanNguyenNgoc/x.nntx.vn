import { AxiosConfig } from "@/configs"
import { Res, ResMedia } from "@/interfaces"

export const MediaApi = {
  post: (formData: FormData) => {
    return AxiosConfig()
      .post('/media', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then<Res<ResMedia>>(res => res.data)
  }
}