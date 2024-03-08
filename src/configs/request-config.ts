import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "",
  headers: {
    "content-Type": "application/json",
  },
});

export default api;
