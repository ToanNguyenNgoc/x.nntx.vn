/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthApi } from "@/apis"
import { ReqLogin, Res, ResLogin } from "@/interfaces";
import { useProfileStore } from "@/stores";
import { useMutation } from "@tanstack/react-query"

const setTokenStorage = (token: string) => {
  return new Promise((rel) => {
    localStorage.setItem('api_token', token);
    rel(true)
  })
}

export function useLogin() {
  const { onGetProfile, onLogout } = useProfileStore(state => state)
  const mutate = useMutation<Res<ResLogin>, any, ReqLogin>({
    mutationFn: body => AuthApi.login(body),
    onSuccess: data => {
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