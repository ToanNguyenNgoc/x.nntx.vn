import { TopicApi } from "@/apis"
import { ReqTopic, Res, ResPaginate, ResTopic } from "@/interfaces"
import { CONST } from "@/utils"
import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query"

export function useGetInfinitiesTopics(options?: UseInfiniteQueryOptions<Res<ResPaginate<ResTopic[]>>>) {
  const params: ReqTopic = {
    include: 'users|last_message',
    sort: '-updated_at'
  }
  const query = useInfiniteQuery({
    queryKey: [CONST.queryKey.topics, params],
    queryFn: ({ pageParam = 1 }) => TopicApi.getTopics({ ...params, page: pageParam }),
    staleTime: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.context.current_page < lastPage?.context.last_page) {
        return lastPage?.context.current_page + 1
      } else {
        return undefined
      }
    },
    ...options
  })
  const topics = query.data?.pages.flatMap(i => i.context.data) || [];
  return Object.assign(query, {
    topics,
    isEmpty: topics.length === 0 && !query.isLoading,
    onLoadMore: () => query.hasNextPage ? query.fetchNextPage() : null
  })
}