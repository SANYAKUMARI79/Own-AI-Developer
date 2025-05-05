import axios from 'axios';

// Create an Axios instance with the production API URL
const instance = axios.create({
  baseURL: 'https://own-ai-developer-4.onrender.com', // Directly use the production API URL
});

// Automatically attach token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers if available
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

export default instance;
