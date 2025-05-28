/* eslint-disable @typescript-eslint/no-explicit-any */
import defaultAvatar from "@/assets/default-avatar.png";
import type { SyntheticEvent } from "react";
import { CONST } from "./constant";
import moment from "moment";

export const onErrorAvatar = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  if (e.currentTarget.src !== defaultAvatar) {
    e.currentTarget.src = defaultAvatar;
    e.currentTarget.style.objectFit = "contain";
  }
};

export const Log = (data: any) => {
  if (CONST.isDev) {
    return console.log(data);
  } else {
    return null;
  }
}

export const formatTime = (time: string, formatPattern = 'YYYY-MM-DD HH:mm') => {
  return moment(time).format(formatPattern)
}
