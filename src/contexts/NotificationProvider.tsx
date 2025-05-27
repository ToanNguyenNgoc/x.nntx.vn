/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useProfileStore } from "@/stores";
import { createContext, ReactNode, useEffect, useState } from "react";
import Pusher from "pusher-js";
import { API_URL } from "@/configs";
import { CONST } from "@/utils";
import { Noti } from "@/components/NotificationPopup";

//@ts-ignore
window.Pusher = Pusher;

export type NotificationContextType = {
  notification: any
};

export const NotificationContext = createContext<NotificationContextType | null>(null);
export default function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<any>();
  const { profile } = useProfileStore(state => state);
  useEffect(() => {
    // Pusher.logToConsole = true;
    const pusher = new Pusher(CONST.key.pusher_key, {
      cluster: 'ap1',
      authEndpoint: `${API_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('api_token')}`,
          Accept: 'application/json',
        },
      },
    });
    const channel = pusher
      .subscribe(`private-subscribe-notification.user_id.${profile?.id}`)
      .bind('emit-notification', (data: any) => {
        console.log("Notification: ", data);
        setNotification(data);
        Noti.open(data);
      })
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  })


  const value = {
    notification
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}