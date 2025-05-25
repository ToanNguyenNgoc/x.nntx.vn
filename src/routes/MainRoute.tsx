/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { AuthRoute } from "./AuthRoute";
import { PrivateRoute } from "./PrivateRoute";
import { useProfileStore } from "@/stores";

export const MainRoute = () => {
  const stateProfile = useProfileStore((state: any) => state);
  const { loadingProfile, profile, onGetProfile } = stateProfile;
  useEffect(() => {
    onGetProfile()
  }, [])
  if (loadingProfile) return <div>Loading....</div>
  return profile ? <PrivateRoute /> : <AuthRoute />
}