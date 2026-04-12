/** Backend API base URL from `frontend/.env` (`VITE_API_URL`). Empty string falls back to same-origin / Vite dev proxy. */
export const BACKEND_URL: string = import.meta.env.VITE_API_URL ?? "";
