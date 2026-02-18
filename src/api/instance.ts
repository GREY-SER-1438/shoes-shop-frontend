import axios from "axios";

export const instance = axios.create({
  baseURL: "http://192.168.3.5:3000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
