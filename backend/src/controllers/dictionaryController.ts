import { Response } from "express";
import { supabase } from "../config/supabase.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

export const getDictionaries = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    const { data, error } = await supabase
      .from("dictionaries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      res.status(500).json({ error: "Failed to fetch dictionaries" });
      return;
    }

    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createDictionary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { name, main_language, secondary_language } = req.body;

    if (!name || !main_language || !secondary_language) {
      res.status(400).json({ error: "Name and languages are required" });
      return;
    }

    const { data, error } = await supabase
      .from("dictionaries")
      .insert({
        user_id: userId,
        name,
        main_language,
        secondary_language,
      })
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: "Failed to create dictionary" });
      return;
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteDictionary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // Перевірка чи словник належить користувачу
    const { data: dict, error: fetchError } = await supabase
      .from("dictionaries")
      .select("id")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (fetchError || !dict) {
      res.status(404).json({ error: "Dictionary not found" });
      return;
    }

    const { error } = await supabase.from("dictionaries").delete().eq("id", id);
    if (error) {
      res.status(500).json({ error: "Failed to delete dictionary" });
      return;
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
