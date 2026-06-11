import express from "express"

import adminAuth from "../middleware/adminAuth.js"
import protect from "../middleware/authMiddleware.js"

import { addComment, createPost, deletePost, getPosts, likePost } from "../controllers/postController.js"
import upload from "../middleware/upload.js"

const router = express.Router()

router.post("/create", protect, adminAuth,upload.single("file"), createPost)
router.get("/getpost",getPosts)
router.delete("/delete-post/:id", protect, adminAuth, deletePost)
router.put("/like/:id",protect,likePost)
router.post("/comment/:id",protect,addComment)

export default router