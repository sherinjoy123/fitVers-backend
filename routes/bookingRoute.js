import express from "express"
import protect from "../middleware/authMiddleware.js"
import { createOrder, getMyBooking, verifyPayment } from "../controllers/bookingController.js"

const router = express.Router()

router.post("/create-order",protect,createOrder)

router.post("/verify-payment",protect,verifyPayment)

router.get("/getBooking",protect,getMyBooking)

export default router