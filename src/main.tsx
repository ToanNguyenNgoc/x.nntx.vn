import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={String(import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_KEY)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
  // </React.StrictMode>
);
