import { Router } from "express";
import { body } from "express-validator";
import {
  createDictionary,
  deleteDictionary,
  getDictionaries,
} from "../controllers/dictionaryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getDictionaries);

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("main_language").notEmpty().withMessage("Main language is required"),
    body("secondary_language").notEmpty().withMessage("Secondary language is required"),
  ],
  createDictionary
);

router.delete("/:id", deleteDictionary);

export default router;
