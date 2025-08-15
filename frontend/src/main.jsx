import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);