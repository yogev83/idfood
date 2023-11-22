import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";

import { setupWorker } from "msw";
import { handlers } from "./handlers";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKxNWiS_ins-CrGFn3_YdOUBN1muOWFTk",
  authDomain: "idfood-403905.firebaseapp.com",
  projectId: "idfood-403905",
  storageBucket: "idfood-403905.appspot.com",
  messagingSenderId: "814655008016",
  appId: "1:814655008016:web:3ded50964de1208b09c995",
  measurementId: "G-7H0B86QZCM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//if (process.env.NODE_ENV === "development" || process.env.USE_MSW === "true") {
const worker = setupWorker(...handlers);
worker.start();
//}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
