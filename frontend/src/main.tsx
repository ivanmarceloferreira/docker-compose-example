import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
