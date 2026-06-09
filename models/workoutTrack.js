import mongoose from "mongoose";

const workoutTrackSchema = new mongoose.Schema(
  {
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "trainer",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    workoutName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Tracking = mongoose.model("Tracking", workoutTrackSchema);

export default Tracking