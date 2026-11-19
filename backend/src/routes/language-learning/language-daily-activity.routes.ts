import { Router } from "express";

import { getLanguageDailyActivity } from "../../controllers/language-learning/language-daily-activity.controller.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/language-daily-activity", getLanguageDailyActivity);

export const languageDailyActivityRoutes = router;
