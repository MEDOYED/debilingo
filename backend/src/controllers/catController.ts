import { Response } from "express";
import { supabase } from "../config/supabase.js";
import { AuthRequest } from "../middleware/authMiddleware.js";
import type { Cat, CatRarity, CreateCatDto, UpdateCatDto } from "../types/cat.js";

export const getCats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    const { data, error } = await supabase
      .from("cats")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching cats:", error);
      res.status(500).json({ error: "Failed to fetch cats", details: error.message });
      return;
    }

    res.json(data || []);
  } catch (error: any) {
    console.error("Internal error in getCats:", error);
    res.status(500).json({ error: "Internal server error", details: error?.message });
  }
};

export const getCatById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const { data, error } = await supabase
      .from("cats")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      res.status(404).json({ error: "Cat not found", details: error?.message });
      return;
    }

    res.json(data);
  } catch (error: any) {
    console.error("Internal error in getCatById:", error);
    res.status(500).json({ error: "Internal server error", details: error?.message });
  }
};

export const createCat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const {
      name,
      image_url,
      latitude,
      longitude,
      location_name,
      breed,
      rarity = "Common",
      notes,
    }: CreateCatDto = req.body;

    if (!name || !image_url || latitude === undefined || longitude === undefined) {
      res.status(400).json({ error: "Name, image, latitude, and longitude are required" });
      return;
    }

    const { data, error } = await supabase
      .from("cats")
      .insert({
        user_id: userId,
        name: name.trim(),
        image_url,
        latitude: Number(latitude),
        longitude: Number(longitude),
        location_name: location_name ? location_name.trim() : null,
        breed: breed ? breed.trim() : null,
        rarity,
        notes: notes ? notes.trim() : null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error inserting cat into Supabase:", error);
      res.status(500).json({ error: "Failed to save cat", details: error.message, hint: error.hint });
      return;
    }

    res.status(201).json(data);
  } catch (error: any) {
    console.error("Internal error in createCat:", error);
    res.status(500).json({ error: "Internal server error", details: error?.message });
  }
};

export const updateCat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { name, location_name, breed, rarity, notes }: UpdateCatDto = req.body;

    const updates: Partial<Cat> = {};
    if (name !== undefined) updates.name = name.trim();
    if (location_name !== undefined) updates.location_name = location_name ? location_name.trim() : null;
    if (breed !== undefined) updates.breed = breed ? breed.trim() : null;
    if (rarity !== undefined) updates.rarity = rarity as CatRarity;
    if (notes !== undefined) updates.notes = notes ? notes.trim() : null;

    const { data, error } = await supabase
      .from("cats")
      .update(updates)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error || !data) {
      res.status(404).json({ error: "Cat not found or failed to update", details: error?.message });
      return;
    }

    res.json(data);
  } catch (error: any) {
    console.error("Internal error in updateCat:", error);
    res.status(500).json({ error: "Internal server error", details: error?.message });
  }
};

export const deleteCat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const { error } = await supabase
      .from("cats")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      res.status(500).json({ error: "Failed to delete cat", details: error.message });
      return;
    }

    res.json({ success: true, message: "Cat deleted successfully" });
  } catch (error: any) {
    console.error("Internal error in deleteCat:", error);
    res.status(500).json({ error: "Internal server error", details: error?.message });
  }
};

export const getCatStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    const { data, error } = await supabase
      .from("cats")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      res.status(500).json({ error: "Failed to fetch cat stats", details: error.message });
      return;
    }

    const cats: Cat[] = data || [];
    const total = cats.length;
    const rarityBreakdown: Record<CatRarity, number> = {
      Common: 0,
      Rare: 0,
      Epic: 0,
      Legendary: 0,
    };

    cats.forEach((c) => {
      const r = (c.rarity as CatRarity) || "Common";
      if (rarityBreakdown[r] !== undefined) {
        rarityBreakdown[r] += 1;
      } else {
        rarityBreakdown.Common += 1;
      }
    });

    res.json({
      total,
      rarityBreakdown,
      latestCatch: cats.length > 0 ? cats[0] : null,
    });
  } catch (error: any) {
    console.error("Internal error in getCatStats:", error);
    res.status(500).json({ error: "Internal server error", details: error?.message });
  }
};
