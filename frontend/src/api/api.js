import axios from "axios";

const api = axios.create({
  // homolog: "https://lindinhos.filipixel.com/api"
  // prod: "/api"
  baseURL: "/api",
});

export default api;
