import axios from "axios";
import config from "./config";

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token; // Ensure "Bearer " prefix is included if needed
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

