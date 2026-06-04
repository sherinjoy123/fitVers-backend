import express from "express"

import {
  registerUser,
  loginUser,
  getprofile,
  updateProfile,
  getUserId
} from "../controllers/authController.js"



import upload from "../middleware/upload.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/:id",getUserId)

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/profile", protect, getprofile)

router.put(
  "/profilepic",
  protect,
  upload.single("profilePic"),
  updateProfile
)

export default router