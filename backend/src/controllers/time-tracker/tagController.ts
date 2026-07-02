import { Response } from "express";
import { supabase } from "../../config/supabase.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

import type { CreateTagRequest, UpdateTagRequest } from "../../types/timeTracker.js";

export const getTags = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  const { data, error } = await supabase
    .from("tracker_tags")
    .select("*")
    .eq("user_id", userId)
    .order("name");

  if (error) {
    res.status(500).json({
      error: "Failed to fetch tags",
    });
    return;
  }

  res.json(data || []);
};

export const createTag = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  const { name, color } = req.body as CreateTagRequest;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const { data, error } = await supabase
    .from("tracker_tags")
    .insert({ user_id: userId, name: name.trim(), color: color || "#6366f1" })
    .select()
    .single();

  if (error?.code === "23505") {
    res.status(409).json({ error: "Tag with this name already exists" });
    return;
  }

  if (error) {
    res.status(500).json({
      error: "Failed to create tag",
    });
    return;
  }

  res.json(data);
};

export const updateTag = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  const { id } = req.params;
  const updates = req.body as UpdateTagRequest;

  const { data, error } = await supabase
    .from("tracker_tags")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error?.code === "23505") {
    res.status(409).json({ error: "Tag with this name already exists" });
    return;
  }

  if (error) {
    res.status(500).json({
      error: "Failed to update tag",
    });
    return;
  }

  res.json(data);
};

export const deleteTag = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  const { id } = req.params;

  const { error } = await supabase.from("tracker_tags").delete().eq("id", id).eq("user_id", userId);

  if (error) {
    res.status(500).json({
      error: "Failed to delete tag",
    });
    return;
  }

  res.json({ success: true });
};
