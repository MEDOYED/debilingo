import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from "../../controllers/time-tracker/tagController.js";

const router = Router();
router.use(authMiddleware);

router.get("/tracker-tags", getTags);
router.post("/tracker-tags", createTag);
router.put("/tracker-tags/:id", updateTag);
router.delete("/tracker-tags/:id", deleteTag);

export default router;
