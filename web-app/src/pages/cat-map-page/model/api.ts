import apiClient from "@shared/api/apiClient";
import type { Cat } from "./types";

export const getCats = async (): Promise<Cat[]> => {
  try {
    const response = await apiClient.get<Cat[]>("/cats");
    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch cats:", error);
    return [];
  }
};

export const getCatById = async (id: string): Promise<Cat | null> => {
  try {
    const response = await apiClient.get<Cat>(`/cats/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch cat ${id}:`, error);
    return null;
  }
};
