import dotenv from "dotenv"
dotenv.config({ path: "./.env" })
dotenv.config()

import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import path from "path"
import http from "http"
import { Server } from "socket.io"
import { fileURLToPath } from "url"

import connectDb from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoute.js"
import postRoutes from "./routes/postRoutes.js"
import trainerRoutes from "./routes/trainerRoutes.js"
import bookingRoute from "./routes/bookingRoute.js"
import messageRoute from "./routes/messageRoute.js"
import workoutRoute from "./routes/workoutRoute.js"

connectDb()

const app = express()

// FIX __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/trainers", trainerRoutes)
app.use("/api/payment", bookingRoute)
app.use("/api/messages",messageRoute)
app.use("/api/workouts",workoutRoute)

// Home route
app.get("/", (req, res) => {
  res.send("FitVers Backend Running")
})

// socket io

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Chat Room Join
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("Joined room:", room);
  });

  // Chat Message
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  // Online Users
  socket.on("user_online", (userId) => {
    onlineUsers[userId] = socket.id;
    io.emit("online_users", Object.keys(onlineUsers));
  });

  // Video Call
  socket.on("call-user", (data) => {
    socket.to(data.roomId).emit("incoming-call", data);
  });

  socket.on("answer-call", (data) => {
    socket.to(data.roomId).emit("call-accepted", data.signal);
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socket.id
    );

    if (userId) {
      delete onlineUsers[userId];
      io.emit("online_users", Object.keys(onlineUsers));
    }

    console.log("User disconnected:", socket.id);
  });
});
// PORT
const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})