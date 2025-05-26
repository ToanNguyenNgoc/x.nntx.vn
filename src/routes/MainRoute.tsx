/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { AuthRoute } from "./AuthRoute";
import { PrivateRoute } from "./PrivateRoute";
import { useProfileStore } from "@/stores";

export const MainRoute = () => {
  const {loadingProfile, profile, onGetProfile} = useProfileStore(state => state);
  useEffect(() => {
    onGetProfile()
  }, [])
  if (loadingProfile) return <div>Loading....</div>
  return profile ? <PrivateRoute /> : <AuthRoute />
}