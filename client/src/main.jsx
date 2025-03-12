import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import About from "./pages/About.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <About />
  </StrictMode>
);
