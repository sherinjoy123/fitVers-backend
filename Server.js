import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

import connectDb from "./config/db.js";
import seedAdmin from "./seeders/seedAdmin.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoute.js";
import postRoutes from "./routes/postRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import bookingRoute from "./routes/bookingRoute.js";
import messageRoute from "./routes/messageRoute.js";
import workoutRoute from "./routes/workoutRoute.js";
import workoutTrackRoute from "./routes/workoutTrackRoute.js";

const app = express();

// ES Modules __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/payment", bookingRoute);
app.use("/api/messages", messageRoute);
app.use("/api/workouts", workoutRoute);
app.use("/api/tracks", workoutTrackRoute);

// Home Route
app.get("/", (req, res) => {
  res.send("FitVers Backend Running");
});

// HTTP Server
const server = http.createServer(app);

// Socket.IO
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  },
});

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Chat Room Join
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("JOINED:", socket.id, "ROOM:", room);
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
    socket.to(data.roomId).emit("incoming-call", {
      signal: data.signal,
    });
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

const PORT = process.env.PORT || 4000;

// Start Server
const startServer = async () => {
  try {
    await connectDb();
    console.log("✅ MongoDB Connected");

    await seedAdmin();

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("❌ Server Startup Error:", error);
  }
};

startServer();