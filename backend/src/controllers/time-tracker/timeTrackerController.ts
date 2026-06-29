import { Response } from "express";
import { supabase } from "../../config/supabase.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

import type { CreateTrackerRequest, UpdateTrackerRequest } from "../../types/timeTracker.js";

export const getTrackers = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  const { data, error } = await supabase
    .from("time_trackers")
    .select(`*, tag:tracker_tags(*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    res.status(500).json({ error: "Failed to fetch trackers" });
    return;
  }

  res.json(data || []);
};

export const createTracker = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  const { name, color, tag_id } = req.body as CreateTrackerRequest;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const { data, error } = await supabase
    .from("time_trackers")
    .insert({
      user_id: userId,
      name: name.trim(),
      color: color || "#6366f1",
      tag_id: tag_id || null,
    })
    .select(`*, tag:tracker_tags(*)`)
    .single();

  if (error) {
    res.status(500).json({ error: "Failed to create tracker" });
    return;
  }

  res.status(201).json(data);
};

export const updateTracker = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  const { id } = req.params;
  const updates = req.body as UpdateTrackerRequest;

  const { data, error } = await supabase
    .from("time_trackers")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select(`*, tag:tracker_tags(*)`)
    .single();

  if (error) {
    res.status(500).json({ error: "Failed to update tracker" });
    return;
  }

  res.json(data);
};

export const deleteTracker = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  const { id } = req.params;

  const { error } = await supabase
    .from("time_trackers")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    res.status(500).json({ error: "Failed to delete tracker" });
    return;
  }

  res.json({ success: true });
};
