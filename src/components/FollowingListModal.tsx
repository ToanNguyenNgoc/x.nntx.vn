import { X } from "lucide-react";
import { CONST } from "@/utils";
import { LoadingSkeleton } from "./SearchModal";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ReqFollow } from "@/interfaces";
import { FollowApi } from "@/apis";
import { FollowerItem } from "./FollowerListModal";

export default function FollowingListModal({
  userId,
  onClose,
}: {
  userId: number;
  onClose: () => void;
}) {
  const params: ReqFollow = {
    'filter[follower_user_id]': userId,
    'include': 'following_user'
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
          <h2 className="text-lg font-semibold">Đang theo dõi</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto space-y-2">
          {isLoading && <LoadingSkeleton />}
          {followers.length === 0 && !isLoading && (
            <p className="text-sm text-gray-500">Chưa theo dõi.</p>
          )}
          {followers.map((follower) => (
            <div key={follower.id}>
              {follower.following_user && <FollowerItem user={follower.following_user} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
