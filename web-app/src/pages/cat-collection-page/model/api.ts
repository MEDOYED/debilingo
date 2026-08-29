import apiClient from "@shared/api/apiClient";
import type { Cat, CatStats } from "./types";

export const getCats = async (): Promise<Cat[]> => {
  const response = await apiClient.get<Cat[]>("/cats");
  return response.data || [];
};

export const getCatStats = async (): Promise<CatStats> => {
  const response = await apiClient.get<CatStats>("/cats/stats");
  return response.data;
};

export const deleteCat = async (id: string): Promise<boolean> => {
  const response = await apiClient.delete(`/cats/${id}`);
  return response.data?.success || false;
};

export const updateCat = async (
  id: string,
  payload: Partial<Cat>
): Promise<Cat> => {
  const response = await apiClient.put(`/cats/${id}`, payload);
  return response.data;
};
