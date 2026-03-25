import apiClient from "./apiClient";

export interface Dictionary {
  id: string;
  user_id: string;
  name: string;
  main_language: string;
  secondary_language: string;
  created_at: string;
}

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
