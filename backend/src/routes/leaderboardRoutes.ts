import { Router } from "express";

// import from controllers
// import ... dont forget .js at the end
import { getLeaderboardTotalXp } from "../controllers/leaderboardController.js";

import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.get("/leaderboards/totalXp", getLeaderboardTotalXp);

export default router;
