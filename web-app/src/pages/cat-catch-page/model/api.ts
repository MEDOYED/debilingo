import apiClient from "@shared/api/apiClient";
import type { CreateCatPayload } from "./types";

export const createCatCatch = async (payload: CreateCatPayload) => {
  const response = await apiClient.post("/cats", payload);
  return response.data;
};
