import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import {
  getTrackers,
  createTracker,
  updateTracker,
  deleteTracker,
} from "../../controllers/time-tracker/timeTrackerController.js";

const router = Router();
router.use(authMiddleware);

router.get("/time-trackers", getTrackers);
router.post("/time-trackers", createTracker);
router.put("/time-trackers/:id", updateTracker);
router.delete("/time-trackers/:id", deleteTracker);

export default router;
