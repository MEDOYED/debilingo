import { Router } from "express";
import { getMyProfile, studyActivity, updateMyUsername } from "../controllers/profileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile/me", authMiddleware, getMyProfile);
router.patch("/profile/me", authMiddleware, updateMyUsername);
router.post("/profile/study", authMiddleware, studyActivity);

export default router;
