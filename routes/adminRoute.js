import express from "express"
import { adminLogin, deleteUser, getAllBookingsAdmin, getDashboardStates, getUsers } from "../controllers/AdminController.js"
import protect from "../middleware/authMiddleware.js"
import adminAuth from "../middleware/adminAuth.js"

const router = express.Router()

router.post("/login", adminLogin)

router.get(
  "/dashboard-stats",
  protect,
  adminAuth,
  getDashboardStates
)

router.get(
  "/allusers",
  protect,
  adminAuth,
  getUsers
)

router.delete(
  "/delete-user/:id",
  protect,
  adminAuth,
  deleteUser
)

router.get(
  "/bookings",
  protect,
  adminAuth,
  getAllBookingsAdmin
)
export default router