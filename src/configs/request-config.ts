import axios, {AxiosInstance} from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://to-do-check-server.vercel.app',
  headers: {
    'content-Type': 'application/json',
  },
});

export default api;
