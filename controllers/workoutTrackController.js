import Tracking from "../models/workoutTrack.js";

 const assignWorkout = async (req, res) => {
  try {
    const workout = await Tracking.create(req.body);

    res.status(201).json({
      success: true,
      workout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 const getUserWorkouts = async (req, res) => {
    try {
      const workouts = await Tracking.find({
        userId: req.params.userId,
      });
  
      res.status(200).json({
        success: true,
        workouts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  const completeWorkout = async (req, res) => {
    try {
      const workout = await Tracking.findByIdAndUpdate(
        req.params.id,
        {
          status: "Completed",
          completedAt: new Date(),
        },
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        workout,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export { assignWorkout,getUserWorkouts,completeWorkout}