import axios from "axios";
import { BACKEND_URL } from "@/lib/env";

/** Uses `BACKEND_URL` from `frontend/.env` (`VITE_API_URL`). Empty uses same-origin / Vite dev proxy. */
export const api = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
