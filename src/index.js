import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./assets/reset.scss";
import "./assets/login.scss";
import "./assets/join.scss";
import "./assets/todo.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
