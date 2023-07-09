import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./components/App";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-t0q16ehr52s6teks.us.auth0.com"
    clientId="KLyje3g1xSUODFXx5Q6n8yqOOdnZlxN4"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
