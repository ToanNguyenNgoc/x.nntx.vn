import { UserApi } from "@/apis/user.api";
import { ReqUser, Res, ResPaginate, ResUser } from "@/interfaces";
import { CONST } from "@/utils";
import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";

type ResQueryType = Res<ResPaginate<ResUser[]>>;

export function useGetInfinitiesUsers(params?: ReqUser, options?: UseInfiniteQueryOptions<ResQueryType>) {
  const query = useInfiniteQuery({
    queryKey: [CONST.queryKey.users, params],
    queryFn: ({ pageParam = 1 }) => UserApi.getUsers({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage?.context.current_page < lastPage?.context.last_page) {
        return lastPage?.context.current_page + 1
      } else {
        return undefined
      }
    },
    ...options
  })
  const users = query.data?.pages.flatMap(i => i.context.data) || [];
  return Object.assign(query, {
    users,
    onLoadMore: () => query.hasNextPage ? query.fetchNextPage() : null,
    isEmpty: !query.isLoading && users.length === 0
  })
}