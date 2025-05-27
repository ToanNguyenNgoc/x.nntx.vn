import defaultAvatar from "@/assets/default-avatar.png";
import type { SyntheticEvent } from "react";

export const onErrorAvatar = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  if (e.currentTarget.src !== defaultAvatar) {
    e.currentTarget.src = defaultAvatar;
    e.currentTarget.style.objectFit = "contain";
  }
};
