import { ResTopic, ResUser } from "@/interfaces"
import { useProfileStore } from "@/stores";

export function useGetTopicName(topic: ResTopic) {
  const { profile } = useProfileStore(state => state);
  let user: ResUser | null = null;
  let name = topic.name || topic.users.map(i => i.name).join(', ');
  if (topic.type === 'DUOS') {
    const users = topic.users.filter(i => i.id !== profile?.id);
    if (users.length > 0) {
      name = users[0].name;
      user = users[0]
    }
  }
  return {
    name,
    user
  }
}