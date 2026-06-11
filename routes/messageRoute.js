import express from "express";
import { saveMessage, getMessage } from "../controllers/messageController.js";
import protectAny from "../middleware/protectAny.js";

const router = express.Router();

router.post("/save-message", protectAny, saveMessage);
router.get("/:senderId/:receiverId", protectAny, getMessage);

export default router;
