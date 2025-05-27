import { ResUser } from "@/interfaces";
import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import Avatar from "./Avatar";

interface UserItemProps extends LinkProps {
  user: ResUser
}

export const UserItem: FC<UserItemProps> = (props) => {
  const { user, ...rest } = props;
  return (
    <Link {...rest} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
      <Avatar src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
      <div>
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
    </Link>
  )
}