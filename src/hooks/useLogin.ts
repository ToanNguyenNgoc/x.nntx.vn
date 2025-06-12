/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthApi } from "@/apis"
import { ReqLogin, Res, ResLogin } from "@/interfaces";
import { useProfileStore } from "@/stores";
import { useMutation, useQueryClient } from "@tanstack/react-query"

const setTokenStorage = (token: string) => {
  return new Promise((rel) => {
    localStorage.setItem('api_token', token);
    rel(true)
  })
}

export function useLogin() {
  const client = useQueryClient();
  const { onGetProfile, onLogout } = useProfileStore(state => state)

  const onLoginSuccess = (data: Res<ResLogin>) => {
    if (!data.context.token) return;
    setTokenStorage(data.context.token).then(() => onGetProfile())
  }

  const mutate = useMutation<Res<ResLogin>, any, ReqLogin>({
    mutationFn: body => AuthApi.login(body),
    onSuccess: data => onLoginSuccess(data),
    onError: (error: any) => {
      console.log(error)
    }
  })

  const mutateLoginGoogle = useMutation<Res<ResLogin>, any, { credential: string }>({
    mutationFn: body => AuthApi.loginGoogle(body),
    onSuccess: data => onLoginSuccess(data),
    onError: (error: any) => {
      console.log(error)
    }
  })

  return {
    mutateLogin: mutate,
    mutateLoginGoogle,
    onLogout: () => {
      client.clear();
      onLogout();
    }
  }
}