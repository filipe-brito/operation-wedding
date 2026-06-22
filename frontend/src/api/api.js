import axios from "axios";

const api = axios.create({
  // homolog: "https://lindinhos.filipixel.com/api"
  // prod: "/api"
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;
