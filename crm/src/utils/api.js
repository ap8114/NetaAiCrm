import axios from "axios";

// Use VITE environment variable or fallback
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";

// Create Axios instance
const api = axios.create({ baseURL });

// Request interceptor: Adds Authorization header if token exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        // Optional: Set content-type automatically (e.g. for FormData)
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        } else if (config.data && typeof config.data === "object") {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
