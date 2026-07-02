import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { getTimeStats } from "../../controllers/time-tracker/statsController.js";

const router = Router();
router.use(authMiddleware);

router.get("/time-stats", getTimeStats);

export default router;
