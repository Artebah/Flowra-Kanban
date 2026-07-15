import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { refresh } from "./authApi";
import { clearAuthAndRedirect } from "@/utils/clearAuthAndRedirect";

declare module "axios" {
  export interface AxiosRequestConfig {
    disableErrorToast?: boolean;
  }
}

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
  (error) => {
    const disableToast = error.config?.disableErrorToast;
    const originalRequest = error.config;

    if (!disableToast) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error(error.message || "Something went wrong");
      }
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      refresh()
        .then((data) => {
          if (!data) {
            clearAuthAndRedirect();
            return;
          }

          localStorage.setItem("accessToken", data.accessToken);
          originalRequest.headers["Authorization"] =
            `Bearer ${data.accessToken}`;
          return axiosInstance(originalRequest);
        })
        .catch(() => {
          clearAuthAndRedirect();
        });
    }

    return Promise.reject(error);
  }
);
