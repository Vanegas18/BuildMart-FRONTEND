import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { BuildMart } from "./BuildMart";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BuildMart />
  </StrictMode>
);
