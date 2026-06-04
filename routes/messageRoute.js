import express from "express"
import {saveMessage,getMessage} from "../controllers/messageController.js"

const router = express.Router()

router.post("/save-message",saveMessage);
router.get("/:senderId/:receiverId",getMessage)

export default router