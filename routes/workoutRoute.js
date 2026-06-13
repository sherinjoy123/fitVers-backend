import express from "express";
import { addWorkout, getWorkouts, deleteWorkout } from "../controllers/workoutController.js";
import upload from "../config/multer.js";
import protect from "../middleware/authMiddleware.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/addWorkout", protect, adminAuth, upload.single("video"), addWorkout);
router.get("/getAll", getWorkouts);
router.delete("/delete/:id", protect, adminAuth, deleteWorkout);

export default router;
