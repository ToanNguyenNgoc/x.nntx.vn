import { FC } from "react";
import { Outlet } from "react-router-dom";

export const AuthPage: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}