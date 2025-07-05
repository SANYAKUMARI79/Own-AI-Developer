// src/config/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://own-ai-developer-4.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
