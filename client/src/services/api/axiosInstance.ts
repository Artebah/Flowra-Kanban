import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

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

    if (!disableToast) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error(error.message || "Something went wrong");
      }
    }

    return Promise.reject(error);
  }
);
