import React, { FC } from "react";
import { Bounce, ToastContainer } from "react-toastify";

export const RegisterLayout: FC = () => {
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
    </React.Fragment>
  )
}