import apiClient from "@shared/api/apiClient";

import type { Word } from "../types/word-types";

/**
 *
 * @param dictionaryId
 * @param quantityWords
 * @param offset
 * @returns
 */
export const getWords = async (
  dictionaryId: string,
  quantityWords: number,
  offset: number,
  sort?: string
): Promise<Word[]> => {
  const params: Record<string, string | number> = { quantityWords, offset };
  if (sort) params.sort = sort;

  const response = await apiClient.get<Word[]>(
    `/dictionary/${dictionaryId}/words`,
    { params: params }
  );
  return response.data;
};

export const createWord = async (data: {
  dictionary_id: string;
  source_word: string;
  note?: string;
  translations: string[];
  definitions: string[];
  examples: string[];
}): Promise<Word> => {
  const response = await apiClient.post<Word>("/words", data);
  return response.data;
};

export const deleteWord = async (wordId: string): Promise<void> => {
  await apiClient.delete(`/words/${wordId}`);
};

export const pinWord = async (wordId: string): Promise<Word> => {
  const response = await apiClient.patch(`/words/pin/${wordId}`);

  return response.data;
};

export const unpinWord = async (wordId: string): Promise<Word> => {
  const response = await apiClient.patch(`/words/unpin/${wordId}`);

  return response.data;
};

export const shuffleWords = async (dictionaryId: string): Promise<void> => {
  await apiClient.patch(`/words/${dictionaryId}/shuffle`);
};

export const unshuffleWords = async (dictionaryId: string): Promise<void> => {
  await apiClient.patch(`/words/${dictionaryId}/unshuffle`);
};

export const updateWord = async (
  wordId: string,
  data: {
    source_word?: string;
    translations?: string[];
    definitions?: string[];
    examples?: string[];
  }
): Promise<Word> => {
  const response = await apiClient.patch<Word>(`/words/${wordId}`, data);
  return response.data;
};
