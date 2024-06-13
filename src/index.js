import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './BLL/index.js'


if ("serviceWorker" in navigator) {
 
  window.addEventListener("load", function () {
      navigator.serviceWorker
          .register("/worker.js")
          .then(
              function (registration) {
                  console.log(
                      "Worker registration successful",
                      registration.scope);
              },
              function (err) {
                  console.log("Worker registration failed", err);
              }
          )
          .catch(function (err) {
              console.log(err);
          });
  });
} else {
  console.log("Service Worker is not"
      + " supported by browser.");
}



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <Provider store = {store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();