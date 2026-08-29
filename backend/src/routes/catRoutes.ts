import { Router } from "express";
import { body } from "express-validator";
import {
  createCat,
  deleteCat,
  getCatById,
  getCats,
  getCatStats,
  updateCat,
} from "../controllers/catController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// Protect all cat endpoints with authMiddleware
router.use(authMiddleware);

// Get all cats of the authenticated user
router.get("/", getCats);

// Get stats
router.get("/stats", getCatStats);

// Get a single cat
router.get("/:id", getCatById);

// Create a new cat catch
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("image_url").notEmpty().withMessage("Image is required"),
    body("latitude").isNumeric().withMessage("Valid latitude is required"),
    body("longitude").isNumeric().withMessage("Valid longitude is required"),
  ],
  createCat
);

// Update cat details
router.put("/:id", updateCat);

// Delete cat
router.delete("/:id", deleteCat);

export default router;
