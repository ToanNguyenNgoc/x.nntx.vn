import { useGetInfinitiesTopics, useGetTopicName } from "@/hooks";
import Avatar from "./Avatar";
import { ResTopic } from "@/interfaces";
import Skeleton from "./ui/skeleton";
import { Link } from "react-router-dom";
import { useNotiContext } from "@/contexts/NotificationProvider";
import { useEffect } from "react";
import { NOTI_TYPE } from "@/utils";

interface ChatSidebarProps {
  topic_id: number;
}

export default function ChatSidebar({topic_id }: ChatSidebarProps) {
  const { topics, isLoading, refetch } = useGetInfinitiesTopics();
  const {notification} = useNotiContext();
  useEffect(()=>{
    if(notification?.message?.type_id === NOTI_TYPE.CHAT){
      refetch();
    }
  },[notification, refetch])
  return (
    <div className="w-[350px] border-r px-4 py-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">long__do</h2>
      <div className="space-y-4">
        {
          topics.map(topic => (
            <TopicItem key={topic.id} topic={topic} active={topic_id === topic.id} />
          ))
        }
        {isLoading && Array.from({ length: 6 }).map((_, idx) => <TopicItemSkeleton key={idx} />)}
      </div>
    </div>
  );
}

const TopicItem = ({ topic, active }: { topic: ResTopic, active?: boolean }) => {
  const { name, user } = useGetTopicName(topic);
  return (
    <Link
      to={`/messages?topic_id=${topic.id}`}
      key={topic.id}
      className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg 
      ${active ? "bg-gray-200" : "hover:bg-gray-100"}`}
    >
      <Avatar src={topic.type === 'DUOS' ? String(user?.avatar) : 'https://'} className="w-10 h-10 rounded-full" />
      <div>
        <div className="font-medium line-clamp-1">{name}</div>
        <div className="text-sm text-gray-500 truncate w-[200px] line-clamp-1">
          {topic.last_message?.body || '...'}
        </div>
      </div>
    </Link>
  )
}

const TopicItemSkeleton = () => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg animate-pulse">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="w-32 h-4 rounded" />
        <Skeleton className="w-24 h-3 rounded" />
      </div>
    </div>
  );
};
