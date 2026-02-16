import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // (cookies)
  timeout: 180000,// 3minute rakhliya hai......
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
