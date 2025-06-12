import { FC } from "react";
import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const AuthPage: FC = () => {
  return (
    <GoogleOAuthProvider clientId={String(import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_KEY)}>
      <div>
        <Outlet />
      </div>
    </GoogleOAuthProvider>
  )
}