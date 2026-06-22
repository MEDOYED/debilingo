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
