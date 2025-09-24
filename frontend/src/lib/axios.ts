import axios from 'axios';


const baseAxios = axios.create({
  baseURL: process.env.VITE_API_BASE_URL, // Safe access for Jest
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

if (baseAxios && baseAxios.interceptors) {
  baseAxios.interceptors.request.use(
    (config) => {
      const token = localStorage?.getItem?.('token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  baseAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.error('API Error:', error.response.data);
      } else if (error.request) {
        console.error('No response from API', error.request);
      } else {
        console.error('Axios error', error.message);
      }
      return Promise.reject(error);
    }
  );
}

export default baseAxios;
