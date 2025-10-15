import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.scss";
import "./all.min.css";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext";
import DarkModeContextProvider from "./context/darkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DarkModeContextProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </DarkModeContextProvider>
  </BrowserRouter>
);
