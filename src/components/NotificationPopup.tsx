/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { X } from "lucide-react";
import Avatar from "./Avatar";
import { ResMessageNoti } from "@/interfaces";
import { createRef, forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NOTI_TYPE } from "@/utils";

export interface NotiProps { }
export interface NotiHandle {
  open: (args: ResMessageNoti) => void;
  close: () => void;
}

export class Noti {
  //@ts-ignore
  private static notiRef: React.RefObject<NotiHandle> = createRef();

  static register(ref: React.RefObject<NotiHandle>) {
    this.notiRef = ref;
  }

  static open(arg: ResMessageNoti) {
    this.notiRef.current?.open(arg);
  }

  static close() {
    this.notiRef.current?.close();
  }
}

const NotificationPopup = forwardRef<NotiHandle, NotiProps>((_props, ref) => {
  const [noti, setNoti] = useState<ResMessageNoti | null>(null);
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    open(args) {
      setNoti(args);
      setShow(true);

      setTimeout(() => {
        handleClose();
      }, 8000);
    },
    close() {
      handleClose();
    },
  }));

  const handleClose = () => {
    setTimeout(() => {
      setShow(false);
      setNoti(null);
    }, 100);
  };
  const navigate = useNavigate();

  if (!show || !noti) return null;

  const onNavigateNoti = () => {
    if (noti.message.type_id === NOTI_TYPE.CHAT) {
      navigate(`/messages?topic_id=${noti.message.payload_id}`)
    }
    handleClose();
  }

  return (
    <div
      onClick={onNavigateNoti}
      className="fixed top-4 right-4 bg-[#242526] text-white rounded-xl shadow-lg p-4 flex w-[320px] z-50 animate-fade-in"
    >
      <div className="relative">
        <Avatar
          src={'noti.user.avatar'}
          className="w-12 h-12 rounded-full bg-gray-400"
        />
      </div>

      <div className="ml-3 flex-1">
        <p className="text-sm leading-tight">
          <span className="font-semibold">{noti.message.message}</span>{" "}
        </p>
        <p className="text-xs text-blue-400 mt-1">{"Vừa xong"}</p>
      </div>

      <button
        className="ml-2 text-gray-400 hover:text-white"
        onClick={(e) => { e.stopPropagation(); handleClose() }}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
});

export default NotificationPopup;
