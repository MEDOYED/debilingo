import { Response } from "express";
import { supabase } from "../../config/supabase.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";
import type { UpdateSessionRequest } from "../../types/timeTracker.js";

export const getActiveSession = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  if (!userId) { res.status(401).json({ error: "Not authorized" }); return; }

  const { data, error } = await supabase
    .from("time_sessions")
    .select(`*, tracker:time_trackers(*)`)
    .eq("user_id", userId)
    .is("ended_at", null)
    .maybeSingle();

  if (error) { res.status(500).json({ error: "Failed to fetch active session" }); return; }
  res.json(data || null);
};

export const startSession = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  if (!userId) { res.status(401).json({ error: "Not authorized" }); return; }

  const { trackerId } = req.params;

  const { data: tracker } = await supabase
    .from("time_trackers")
    .select("id")
    .eq("id", trackerId)
    .eq("user_id", userId)
    .single();

  if (!tracker) { res.status(404).json({ error: "Tracker not found" }); return; }

  await supabase
    .from("time_sessions")
    .update({ ended_at: new Date().toISOString() })
    .eq("user_id", userId)
    .is("ended_at", null);

  const { data, error } = await supabase
    .from("time_sessions")
    .insert({ user_id: userId, tracker_id: trackerId, started_at: new Date().toISOString() })
    .select(`*, tracker:time_trackers(*)`)
    .single();

  if (error) { res.status(500).json({ error: "Failed to start session" }); return; }
  res.status(201).json(data);
};

export const stopSession = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  if (!userId) { res.status(401).json({ error: "Not authorized" }); return; }

  const { id } = req.params;

  const { data: session } = await supabase
    .from("time_sessions")
    .select("started_at")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (!session) { res.status(404).json({ error: "Session not found" }); return; }

  const now = new Date().toISOString();
  const durationSeconds = Math.floor((Date.now() - new Date(session.started_at).getTime()) / 1000);

  const { data, error } = await supabase
    .from("time_sessions")
    .update({ ended_at: now, duration_seconds: durationSeconds })
    .eq("id", id)
    .eq("user_id", userId)
    .select(`*, tracker:time_trackers(*)`)
    .single();

  if (error) { res.status(500).json({ error: "Failed to stop session" }); return; }
  res.json(data);
};

export const updateSession = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  if (!userId) { res.status(401).json({ error: "Not authorized" }); return; }

  const { id } = req.params;
  const { started_at, ended_at } = req.body as UpdateSessionRequest;

  const updates: Record<string, any> = {};
  if (started_at) updates.started_at = started_at;
  if (ended_at) updates.ended_at = ended_at;
  if (started_at && ended_at) {
    updates.duration_seconds = Math.floor(
      (new Date(ended_at).getTime() - new Date(started_at).getTime()) / 1000
    );
  }

  const { data, error } = await supabase
    .from("time_sessions")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select(`*, tracker:time_trackers(*)`)
    .single();

  if (error) { res.status(500).json({ error: "Failed to update session" }); return; }
  res.json(data);
};

export const deleteSession = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  if (!userId) { res.status(401).json({ error: "Not authorized" }); return; }

  const { id } = req.params;

  const { error } = await supabase
    .from("time_sessions")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) { res.status(500).json({ error: "Failed to delete session" }); return; }
  res.json({ success: true });
};

export const getTrackerSessions = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  if (!userId) { res.status(401).json({ error: "Not authorized" }); return; }

  const { trackerId } = req.params;

  const { data, error } = await supabase
    .from("time_sessions")
    .select("*")
    .eq("user_id", userId)
    .eq("tracker_id", trackerId)
    .order("started_at", { ascending: false });

  if (error) { res.status(500).json({ error: "Failed to fetch sessions" }); return; }
  res.json(data || []);
};
