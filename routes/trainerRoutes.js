import express from 'express'
import { createTrainer, deleteTrainer, getTrainer, getTrainerBooking, trainerLogin,  updateTrainer } from '../controllers/trainerController.js'
import protect from '../middleware/authMiddleware.js'
import upload from '../middleware/upload.js'
import adminAuth from '../middleware/adminAuth.js'
import verifyTrainer from '../middleware/verifyTrainer.js'

const router = express.Router()



router.post("/login",trainerLogin)

router.post(
  "/create-trainer",
  protect,
  adminAuth,
  upload.single("image"),
  createTrainer
)

router.get('/get-trainer', getTrainer)

router.delete(
  '/delete/:id',
  protect,
  adminAuth,
  deleteTrainer
)

router.put(
  "/update/:id",
  protect,
  adminAuth,
  upload.single("image"),
  updateTrainer
);



router.get("/get-booking",verifyTrainer,getTrainerBooking)

export default router