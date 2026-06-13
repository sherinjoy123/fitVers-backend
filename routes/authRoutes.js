import express from "express"

import {
  registerUser,
  loginUser,
  getprofile,
  updateProfile,
  getUserId
} from "../controllers/authController.js"


import upload from "../config/multer.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/profile", protect, getprofile)

router.put(
  "/profile",
  protect,
  updateProfile
)

router.put(
  "/profilepic",
  protect,
  upload.single("profilePic"),
  updateProfile
)

router.get("/:id", getUserId)

export default router