/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MediaApi } from "@/apis";
import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";

export type Media = {
  model_id: number;
  original_url: string;
  model_type: string
}

type PostType = {
  e?: ChangeEvent<HTMLInputElement>,
  files?: FileList,
  callBack?: (data: Media[]) => void,
  onError?: (error: AxiosError) => void
}

export function usePostMedia() {
  const [medias, setMedias] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const handlePostMedia = async ({ e, files, callBack, onError }: PostType) => {
    const dataFiles = e?.target?.files || files || []
    if (dataFiles) {
      setIsLoading(true)
      const tempImages: Media[] = []
      for (let j = 0; j < dataFiles?.length; j++) {
        const item = {
          model_id: -j,
          original_url: URL.createObjectURL(dataFiles[j]),
          model_type: dataFiles[j].type
        }
        tempImages.push(item)
      }
      if (callBack) { callBack(tempImages) }
      try {
        const mediaList: Media[] = []
        for (let i = 0; i < dataFiles?.length; i++) {
          const fileItem = dataFiles[i]
          const formData = new FormData()
          let resMedia = {
            original_url: URL.createObjectURL(fileItem),
            model_id: i,
            model_type: dataFiles[i].type
          }
          formData.append('file', fileItem)
          let res: any
          res = await MediaApi.post(formData).then(res => res.context);
          if (res) {
            resMedia = { ...resMedia, model_id: res.model_id, original_url: res.original_url }
          }
          mediaList.push(resMedia)
        }
        setMedias(mediaList)
        setIsLoading(false)
        if (callBack) { callBack(mediaList) }
      } catch (error) {
        const err = error as AxiosError
        if (onError) {
          onError(err)
        }
      }
    }
  }
  return {
    medias,
    handlePostMedia,
    isLoading
  }
}