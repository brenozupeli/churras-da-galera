import axios from 'axios';

const baseURL = 'http://localhost:3001';

const api = axios.create({
  baseURL,
});

api.interceptors.response.use(null, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    if (error.response.config.url !== '/login') window.location.reload();
  }

  return Promise.reject(error);
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
