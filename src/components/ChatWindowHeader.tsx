import { useGetTopicName } from "@/hooks";
import { ResTopic } from "@/interfaces";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

export function ChatWindowHeader({ topic }: { topic: ResTopic }) {
  const { name, user } = useGetTopicName(topic);
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <Avatar
          src={user?.avatar || 'https://'}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs text-gray-500">
            Instagram • Online
          </div>
        </div>
      </div>
      {
        user &&
        <Link to={`/profile/${user.id}`} className="text-sm px-3 py-1 border rounded">
          Xem trang cá nhân
        </Link>
      }
    </div>
  )
}