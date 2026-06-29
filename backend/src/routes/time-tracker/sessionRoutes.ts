import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import {
  getActiveSession,
  startSession,
  stopSession,
  updateSession,
  deleteSession,
  getTrackerSessions,
} from "../../controllers/time-tracker/sessionController.js";

const router = Router();
router.use(authMiddleware);

router.get("/sessions/active", getActiveSession);
router.post("/time-trackers/:trackerId/sessions/start", startSession);
router.patch("/sessions/:id/stop", stopSession);
router.put("/sessions/:id", updateSession);
router.delete("/sessions/:id", deleteSession);
router.get("/time-trackers/:trackerId/sessions", getTrackerSessions);

export default router;
