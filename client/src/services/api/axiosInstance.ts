import axios from "axios";
import { refresh } from "./authApi";
import { clearAuthAndRedirect } from "@/utils/clearAuthAndRedirect";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers.Authorization) {
      return config;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

axiosInstance.interceptors.response.use(
  (value) => value,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const data = await refresh();

        if (!data) {
          clearAuthAndRedirect();
          return Promise.reject(error);
        }

        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch {
        clearAuthAndRedirect();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
