import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

document.addEventListener("turbo:load", () => {
  if (window.location.href.includes("/users/sign_in") ||
      window.location.href.includes("/users/password/new")) {
    return;
  }
  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  );
  root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
  );
});