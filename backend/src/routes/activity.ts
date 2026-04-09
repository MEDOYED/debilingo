import { Router } from "express";
import { body } from "express-validator";
import { addActivity, getActivity, getStats } from "../controllers/activityController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

/**
 * GET /api/activity
 * Get all activity data for the last year
 */
router.get("/activity", getActivity);

/**
 * POST /api/activity
 * Add or update activity for today
 * Body: { money_count: number (dollar amount), date?: string }
 */
router.post(
  "/activity",
  [
    body("money_count")
      .isInt({ min: 0, max: 100000 })
      .withMessage("Amount must be an integer between 0 and 100,000"),
    body("date").optional().isISO8601().withMessage("Date must be in ISO 8601 format"),
  ],
  addActivity
);

/**
 * GET /api/stats
 * Get total dollars earned in the last year
 */
router.get("/stats", getStats);

export default router;
