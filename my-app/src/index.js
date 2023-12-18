import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { IndexStyles } from "./index.styles.js";
import { ShowEmulationApp } from "./components/Emulation/EmulationApp.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <IndexStyles />
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//пытаюсь понять почему не коммитится
