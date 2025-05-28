/* eslint-disable react-refresh/only-export-components */
import { useProfileStore } from "@/stores";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { PusherService } from "@/services";
import { ResMessageNoti } from "@/interfaces";

export type NotificationContextType = {
  notification: ResMessageNoti|undefined
};

export const NotificationContext = createContext<NotificationContextType | null>(null);
export default function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<ResMessageNoti>();
  const { profile } = useProfileStore(state => state);
  useEffect(() => {
    if (!profile?.id) return;
    const pusher = PusherService.getInstance().getPusher();
    const channel = pusher
      .subscribe(`private-subscribe-notification.user_id.${profile?.id}`)
      .bind('emit-notification', (data: ResMessageNoti) => {
        setNotification(data)
      })
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [profile?.id])


  const value = {
    notification
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotiContext = () => {
  const context = useContext(NotificationContext) as NotificationContextType;
  return context;
}