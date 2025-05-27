import { X } from "lucide-react";
import Avatar from "@/components/Avatar";
import { useFollow } from "@/hooks";
import { CONST } from "@/utils";
import { LoadingSkeleton } from "./SearchModal";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ReqFollow, ResUser } from "@/interfaces";
import { FollowApi } from "@/apis";
import { useProfileStore } from "@/stores";
import { Link } from "react-router-dom";

export default function FollowerListModal({
  userId,
  onClose,
}: {
  userId: number;
  onClose: () => void;
}) {
  const params: ReqFollow = {
    'filter[user_id]': userId,
    'include': 'follower_user'
  }
  const { isLoading, data } = useInfiniteQuery({
    queryKey: [CONST.queryKey.follows, params],
    queryFn: ({ pageParam = 1 }) => FollowApi.getFollows({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage?.context.current_page < lastPage?.context.last_page) {
        return lastPage?.context.current_page + 1
      } else {
        return undefined
      }
    },
    staleTime: 0
  })
  const followers = data?.pages.flatMap(i => i.context.data) || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start pt-20">
      <div className="bg-white w-full max-w-md rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Người theo dõi</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto space-y-2">
          {isLoading && <LoadingSkeleton />}
          {followers.length === 0 && !isLoading && (
            <p className="text-sm text-gray-500">Chưa có người theo dõi nào.</p>
          )}
          {followers.map((follower) => (
            <div key={follower.id}>
              {follower.follower_user && <FollowerItem user={follower.follower_user} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const FollowerItem = ({ user }: { user: ResUser }) => {
  const { isFollow, onTriggerFollow } = useFollow({
    isFollow: !!user.is_follow,
    followerCount: 0,
    userId: user.id,
  });
  const { profile } = useProfileStore(state => state);

  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
      <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
        <Avatar src={user.avatar} className="w-8 h-8" />
        <div>
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </Link>
      {
        profile?.id !== user.id &&
        <button
          onClick={onTriggerFollow}
          className="text-sm px-3 py-1 border rounded-full hover:bg-gray-100 cursor-pointer"
        >
          {isFollow ? 'Đang theo dõi' : 'Theo dõi'}
        </button>
      }
    </div>
  );
}
