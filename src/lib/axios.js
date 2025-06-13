import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://smarthome-33ao.onrender.com/",
  withCredentials: true,
});

const noAuthPaths = [
  "/register/",
  "/login/",
  "/forgot-password/",
  "/reset-password/",
  "/verify-email/",
  "/confirm-email/",
  "/resend-code/",
];

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  const shouldSkipAuth = noAuthPaths.some(path => config.url.includes(path));

  if (token && !shouldSkipAuth) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
