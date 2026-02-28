import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { SchoolProvider } from "./context/SchoolContext";
import AuthProvider from "./context/AuthContext"; // ✅ FIXED (no {})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SchoolProvider>
          <App />
        </SchoolProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);