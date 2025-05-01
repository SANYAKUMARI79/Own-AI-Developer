import axios from 'axios';

// Create an Axios instance
const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

// Automatically attach token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 👈 get token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 👈 attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
