import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  rootElement
);
