import { TopicApi } from "@/apis"
import { ReqTopic } from "@/interfaces"
import { CONST } from "@/utils"
import { useQuery } from "@tanstack/react-query"

export function useGetTopic(id: number) {
  const params: ReqTopic = {
    include: 'users'
  }
  const query = useQuery({
    queryKey: [CONST.queryKey.topics, id, params],
    queryFn: () => TopicApi.getTopic(id, params),
  })
  const topic = query.data?.context
  return Object.assign(query, {
    topic
  })
}