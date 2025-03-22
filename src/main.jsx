import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./shared/styles/index.css";
import "tailwindcss/tailwind.css";
import { BuildMart } from "./BuildMart";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <BuildMart />
  </BrowserRouter>
);
