import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.sass";
import "react-loading-skeleton/dist/skeleton.css";

document.body.style.zoom = Math.min(document.body.clientWidth / 380, 1);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
