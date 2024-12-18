import "./index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

//Strict mode to detect error early
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
