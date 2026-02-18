import axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create({
  baseURL: "http://192.168.3.5:3000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
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
