import express from "express"

import adminAuth from "../middleware/adminAuth.js"
import protect from "../middleware/authMiddleware.js"

import { createPost, deletePost, getPosts } from "../controllers/postController.js"
import upload from "../middleware/upload.js"

const router = express.Router()

router.post("/create", protect, adminAuth,upload.single("file"), createPost)
router.get("/getpost",getPosts)
router.delete("/delete-post/:id",deletePost ,protect,adminAuth)

export default router