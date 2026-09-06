import { Router } from "express";
import {
  getMyProfile,
  saveStudyActivity,
  updateMyUsername,
} from "../controllers/profileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile/me", authMiddleware, getMyProfile);
router.patch("/profile/me", authMiddleware, updateMyUsername);
router.post("/profile/study", authMiddleware, saveStudyActivity);

export default router;
