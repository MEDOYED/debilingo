import apiClient from "./apiClient";

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const register = async (
  email: string,
  password: string,
  username: string
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/register", {
    email,
    password,
    username,
  });
  return response.data;
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};
