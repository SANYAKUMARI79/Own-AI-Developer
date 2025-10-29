import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ Example: "https://own-ai-developer-4.onrender.com"
  withCredentials: true, // ✅ Allows cookies if you use them
});

// ✅ Interceptor ensures token is added fresh every time
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
