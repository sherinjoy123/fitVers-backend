import express from "express";

import {
  assignWorkout,
  getUserWorkouts,
  completeWorkout,
} from "../controllers/workoutTrackController.js";

const router = express.Router();

router.post("/assign", assignWorkout);

router.get("/user/:userId", getUserWorkouts);

router.put("/complete/:id", completeWorkout);

export default router;