import apiClient from "./apiClient";

export interface Translation {
  id: string;
  text: string;
  order_index: number;
}

export interface Definition {
  id: string;
  text: string;
  order_index: number;
}

export interface Example {
  id: string;
  text: string;
  order_index: number;
}

export interface Word {
  id: string;
  dictionary_id: string;
  source_word: string;
  note: string | null;
  created_at: string;
  translations: Translation[];
  definitions: Definition[];
  examples: Example[];
  pinned_at: string | null;
}

export const getWords = async (dictionaryId: string): Promise<Word[]> => {
  const response = await apiClient.get<Word[]>(
    `/dictionary/${dictionaryId}/words`
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
