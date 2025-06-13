import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://smarthome-33ao.onrender.com/", // всегда кидает запросы сюда
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
