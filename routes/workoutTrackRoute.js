import express from "express";

import {
  assignWorkout,
  getUserWorkouts,
  completeWorkout,
} from "../controllers/workoutTrackController.js";
import protectAny from "../middleware/protectAny.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/assign", protect, assignWorkout);
router.get("/user/:userId", protect, getUserWorkouts);
router.put("/complete/:id", protect, completeWorkout);

export default router;
