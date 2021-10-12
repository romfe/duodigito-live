import { Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalCss } from "./styles/global";

ReactDOM.render(
  <React.StrictMode>
    <Global styles={GlobalCss} />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);