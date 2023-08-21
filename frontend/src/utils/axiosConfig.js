import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://vidtube-backend.onrender.com/api",
});
