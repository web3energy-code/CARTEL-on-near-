import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import "@near-wallet-selector/modal-ui/styles.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
