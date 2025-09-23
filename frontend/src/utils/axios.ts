import axios from 'axios';

// Create a base axios instance
const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // your backend API
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Optional: Request interceptor (e.g., for auth token)
baseAxios.interceptors.request.use(
  (config) => {
    // Example: Add token if stored in localStorage
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor for error handling
baseAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Customize error messages
    if (error.response) {
      // Server returned a response outside 2xx
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // No response received
      console.error('No response from API', error.request);
    } else {
      console.error('Axios error', error.message);
    }
    return Promise.reject(error);
  }
);

export default baseAxios;
