import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 URL로 변경
});

instance.interceptors.request.use(config => {
  const token = store.getters.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;