import { FollowApi } from "@/apis";
import { ReqFollow, Res, ResFollow, ResPaginate } from "@/interfaces";
import { CONST } from "@/utils";
import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";

export function useGetFollowerList(id: number, options?: UseInfiniteQueryOptions<Res<ResPaginate<ResFollow[]>>>) {
  const params: ReqFollow = {
    'filter[user_id]': id
  }
  const query = useInfiniteQuery({
    queryKey: [CONST.queryKey, params],
    queryFn: ({ pageParam = 1 }) => FollowApi.getFollows({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage?.context.current_page < lastPage?.context.last_page) {
        return lastPage?.context.current_page + 1
      } else {
        return undefined
      }
    },
    staleTime:0,
    ...options
  })

  const followerCount = query.data?.pages[0].context.total || 0;
  const followerList = query.data?.pages.flatMap(i => i.context.data) || [];
  return Object.assign(query, {
    followerCount,
    followerList
  })
}