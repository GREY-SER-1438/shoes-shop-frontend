import axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create({
  baseURL: "https://untrammeled-unambiguously-houston.ngrok-free.dev/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get("token") ?? Cookies.get("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});
