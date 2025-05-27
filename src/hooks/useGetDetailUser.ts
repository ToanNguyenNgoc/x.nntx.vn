import { UserApi } from "@/apis";
import { Res, ResUser } from "@/interfaces";
import { CONST } from "@/utils";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useGetDetailUser(id?: number | string, options?:UseQueryOptions<Res<ResUser>>) {
  const query = useQuery({
    queryKey: [CONST.queryKey.user, id],
    queryFn: () => UserApi.getUser(String(id)),
    enabled: !!id,
    ...options
  })
  return Object.assign(query, {
    user: query.data?.context
  })
}