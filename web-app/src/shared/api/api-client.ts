import axios from "axios";
import { ApiError } from "./api-error";

export type ApiResponseEnvelope<T = unknown> = {
  success?: boolean;
  data?: T;
  client_message?: string;
  dev_message?: string;

  /**
   * Use client_message or dev_message with success: false to display error message. error: string is deprecated and will be remove in future updates after all backend refactor to new response standart
   *
   * @deprecated
   */
  error?: string;
};

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
  timeout: 10000,
});

// add token for each request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes("/auth/login");

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    const errorData = error.response?.data as ApiResponseEnvelope | undefined;

    const clientMessage = errorData?.client_message;
    const devMessage =
      errorData?.dev_message || errorData?.error || error.message;

    return Promise.reject(
      new ApiError({
        clientMessage: clientMessage,
        devMessage: devMessage,
        status: error.response?.status,
      })
    );
  }
);

// it can be removed after full refactor
/**
 * @deprecated Default export is deprecated. Use only named import:
 * import { apiClient } from "@shared/api";
 */
const deprecatedDefaultApiClient = apiClient;

export default deprecatedDefaultApiClient;
