/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createRef, FC, useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import NotificationPopup, { Noti, NotiHandle } from "./NotificationPopup";

export const RegisterLayout: FC = () => {
  const notiRef = createRef<NotiHandle>();
  useEffect(() => {
    //@ts-ignore
    Noti.register(notiRef);
  }, [notiRef])
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <NotificationPopup ref={notiRef} />
    </React.Fragment>
  )
}