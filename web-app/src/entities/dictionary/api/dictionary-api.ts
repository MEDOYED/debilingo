import { apiClient } from "@shared/api";

import type { Dictionary } from "../model/dictionary-types";

export const getDictionaries = async (): Promise<Dictionary[]> => {
  const response = await apiClient.get<Dictionary[]>("/dictionaries");
  return response.data;
};

export const createDictionary = async (data: {
  name: string;
  main_language: string;
  secondary_language: string;
}): Promise<Dictionary> => {
  const response = await apiClient.post<Dictionary>("/dictionaries", data);
  return response.data;
};

export const deleteDictionary = async (id: string): Promise<void> => {
  await apiClient.delete(`/dictionaries/${id}`);
};
