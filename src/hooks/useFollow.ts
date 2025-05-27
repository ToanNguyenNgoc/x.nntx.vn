/* eslint-disable react-hooks/exhaustive-deps */
import { FollowApi } from "@/apis";
import { useProfileStore } from "@/stores";
import { CONST } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface UseFollowOptions {
  userId: number
  followerCount: number;
  isFollow: boolean
}

export function useFollow(options: UseFollowOptions) {
  const { profile } = useProfileStore(state => state)
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollow, setIsFollow] = useState(false);
  const client = useQueryClient();
  useEffect(() => {
    if (options.userId) {
      setFollowerCount(options.followerCount);
      setIsFollow(options.isFollow)
    }
  }, [options.userId, options.followerCount])
  const onTriggerFollow = async () => {
    if (!isFollow) {
      setFollowerCount(followerCount + 1);
      setIsFollow(true);
      FollowApi.postFollow({ follower_user_id: options.userId }).then().catch(() => {
        setFollowerCount(options.followerCount);
        setIsFollow(options.isFollow)
      });
    } else {
      setFollowerCount(followerCount - 1);
      setIsFollow(false);
      await FollowApi.deleteFollow(options.userId)
        .then(() => {
          client.refetchQueries([CONST.queryKey.follows, { 'filter[follower_user_id]': Number(profile?.id) }])
        })
        .catch(() => {
          setFollowerCount(options.followerCount);
          setIsFollow(options.isFollow);
        });
    }
  }
  return {
    isFollow,
    followerCount,
    onTriggerFollow
  }
}