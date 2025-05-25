/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthApi } from "@/apis"
import { useProfileStore } from "@/stores";
import { useMutation } from "@tanstack/react-query"

const setTokenStorage = (token: string) => {
  return new Promise((rel) => {
    localStorage.setItem('api_token', token);
    rel(true)
  })
}

export function useLogin() {
  const { onGetProfile, onLogout } = useProfileStore((state: any) => state)
  const mutate = useMutation({
    mutationFn: (body: any) => AuthApi.login(body),
    onSuccess: (data: any) => {
      if (data.context.token) {
        setTokenStorage(data.context.token).then(() => onGetProfile())
      }
    },
    onError: (error: any) => {
      console.log(error)
    }
  })
  return {
    mutateLogin: mutate,
    onLogout
  }
}