import express from "express"
import {addWorkout,getWorkouts,deleteWorkout} from "../controllers/workoutController.js"
import upload from "../middleware/upload.js"


const router = express.Router()

router.post("/addWorkout",upload.single("video"),addWorkout)
router.get("/getAll",getWorkouts)
router.delete("/delete/:id",deleteWorkout)

export default router;