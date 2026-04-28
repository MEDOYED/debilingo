import { Response } from "express";
import { supabase } from "../config/supabase.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

export const getWords = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { dictionaryId } = req.params;

    // Перевірка чи словник належить користувачу
    const { data: dict } = await supabase
      .from("dictionaries")
      .select("id") // SQL: SELECT id FROM dictionaries
      .eq("id", dictionaryId) // SQL: WHERE id = <dictionaryId>
      .eq("user_id", userId)
      .single(); // retrun single string (not array)

    if (!dict) {
      res.status(404).json({ error: "Dictionary not found" });
      return;
    }

    // Отримуємо слова
    const { data: words, error: wordsError } = await supabase
      .from("words")
      .select("*")
      .eq("dictionary_id", dictionaryId)
      .order("created_at", { ascending: false });

    if (wordsError) {
      res.status(500).json({ error: "Failed to fetch words" });
      return;
    }

    // Для кожного слова отримуємо translations, definitions, examples
    const wordsWithDetails = await Promise.all(
      (words || []).map(async (word) => {
        const [translations, definitions, examples, pinnedAt] = await Promise.all([
          supabase.from("translations").select("*").eq("word_id", word.id).order("order_index"),
          supabase.from("definitions").select("*").eq("word_id", word.id).order("order_index"),
          supabase.from("examples").select("*").eq("word_id", word.id).order("order_index"),
          supabase.from("words").select("*").eq("word_id", word.id).order("order_index"),
        ]);

        return {
          ...word,
          translations: translations.data || [],
          definitions: definitions.data || [],
          examples: examples.data || [],
          // pinnedAt: pinnedAt || "",
        };
      })
    );

    res.json(wordsWithDetails);
  } catch (error) {
    console.error("Get words error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createWord = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { dictionary_id, source_word, note, translations, definitions, examples } = req.body;

    // Перевірка чи словник належить користувачу
    const { data: dict } = await supabase
      .from("dictionaries")
      .select("id")
      .eq("id", dictionary_id)
      .eq("user_id", userId)
      .single();

    if (!dict) {
      res.status(404).json({ error: "Dictionary not found" });
      return;
    }

    // Створюємо слово
    const { data: word, error: wordError } = await supabase
      .from("words")
      .insert({ dictionary_id, source_word, note: note || null })
      .select()
      .single();

    if (wordError || !word) {
      res.status(500).json({ error: "Failed to create word" });
      return;
    }

    // Додаємо translations
    if (translations && translations.length > 0) {
      const translationsData = translations.map((text: string, index: number) => ({
        word_id: word.id,
        text,
        order_index: index,
      }));
      await supabase.from("translations").insert(translationsData);
    }

    // Додаємо definitions
    if (definitions && definitions.length > 0) {
      const definitionsData = definitions.map((text: string, index: number) => ({
        word_id: word.id,
        text,
        order_index: index,
      }));
      await supabase.from("definitions").insert(definitionsData);
    }

    // Додаємо examples
    if (examples && examples.length > 0) {
      const examplesData = examples.map((text: string, index: number) => ({
        word_id: word.id,
        text,
        order_index: index,
      }));
      await supabase.from("examples").insert(examplesData);
    }

    // Повертаємо слово з усіма даними
    const [translationsData, definitionsData, examplesData] = await Promise.all([
      supabase.from("translations").select("*").eq("word_id", word.id).order("order_index"),
      supabase.from("definitions").select("*").eq("word_id", word.id).order("order_index"),
      supabase.from("examples").select("*").eq("word_id", word.id).order("order_index"),
    ]);
    res.status(201).json({
      ...word,
      translations: translationsData.data || [],
      definitions: definitionsData.data || [],
      examples: examplesData.data || [],
    });
  } catch (error) {
    console.error("Create word error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteWord = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // Перевіряємо чи слово належить до словника користувача
    const { data: word } = await supabase
      .from("words")
      .select("id, dictionary_id")
      .eq("id", id)
      .single();

    if (!word) {
      res.status(404).json({ error: "Word not found" });
      return;
    }

    const { data: dict } = await supabase
      .from("dictionaries")
      .select("id")
      .eq("id", word.dictionary_id)
      .eq("user_id", userId)
      .single();

    if (!dict) {
      res.status(404).json({ error: "Word not found" });
      return;
    }

    // Видаляємо слово (каскадно видаляться translations, definitions, examples)
    const { error } = await supabase.from("words").delete().eq("id", id);
    if (error) {
      res.status(500).json({ error: "Failed to delete word" });
      return;
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Delete word error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const pinWord = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // Перевіряємо чи слово належить до словника користувача
    const { data: word } = await supabase
      .from("words")
      .select("id, dictionary_id")
      .eq("id", id)
      .single();

    if (!word) {
      res.status(404).json({ error: "Word not found" });
      return;
    }

    const { data: dict } = await supabase
      .from("dictionaries")
      .select("id")
      .eq("id", word.dictionary_id)
      .eq("user_id", userId)
      .single();

    if (!dict) {
      res.status(404).json({ error: "Word not found" });
      return;
    }

    // прикріпляємо слово (змінюємо тільки дату)
    const { error: updateError } = await supabase
      .from("words")
      .update({
        pinned_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      res.status(500).json({ error: "Failed to pin word" });
      return;
    }

    const { data: updatedWord, error: fetchError } = await supabase
      .from("words")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !updatedWord) {
      res.status(500).json({ error: "Failed to pin word" });
      return;
    }

    const [translationsData, definitionsData, examplesData] = await Promise.all([
      supabase.from("translations").select("*").eq("word_id", id).order("order_index"),
      supabase.from("definitions").select("*").eq("word_id", id).order("order_index"),
      supabase.from("examples").select("*").eq("word_id", id).order("order_index"),
    ]);

    res.json({
      ...updatedWord,
      translations: translationsData.data || [],
      definitions: definitionsData.data || [],
      examples: examplesData.data || [],
    });
  } catch (error) {
    console.error("Pin word error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
