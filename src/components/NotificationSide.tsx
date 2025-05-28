/* eslint-disable react-hooks/exhaustive-deps */
import { useNotiContext } from "@/contexts/NotificationProvider";
import { NOTI_TYPE } from "@/utils";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Noti } from "./NotificationPopup";

export default function NotificationSide() {
  const { notification } = useNotiContext();
  const location = useLocation();
  const lastNotiId = useRef<number | string | null>(null);

  useEffect(() => {
    if (!notification) return;
    const notiId = notification.message.id;
    if (lastNotiId.current === notiId) return;
    if (location.pathname === '/messages' && notification.message.type_id === NOTI_TYPE.CHAT) return;
    Noti.open(notification);
    lastNotiId.current = notiId;
  }, [notification]);
  return null;
}
