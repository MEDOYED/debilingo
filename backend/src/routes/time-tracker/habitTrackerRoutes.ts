import { Router } from "express";
import {
  getHabitSessions,
  updateHabitTimeGoal,
} from "../../controllers/time-tracker/habitTrackerController.js";
// import { deleteHabitTracker } from "../../controllers/time-tracker/habitTrackerController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);

router.patch("/habit-trackers/:time_tracker_id", updateHabitTimeGoal);
router.get("/habit-trackers/days-stats", getHabitSessions);
// router.delete("/habit-tracker/:trackerId", deleteHabitTracker);

export default router;
