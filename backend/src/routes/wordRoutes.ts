import { Router } from "express";
import { body } from "express-validator";
import { createWord, deleteWord, getWords } from "../controllers/wordController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/dictionary/:dictionaryId/words", getWords);

router.post(
  "/words",
  [
    body("dictionary_id").notEmpty().withMessage("Dictionary ID is required"),
    body("source_word").notEmpty().withMessage("Source word is required"),
  ],
  createWord
);

router.delete("/words/:id", deleteWord);

export default router;
