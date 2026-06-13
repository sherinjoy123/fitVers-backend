import Workout from "../models/workout.js";



const addWorkout = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    console.log("FILE:", req.file);

    const videoUrl = req.file.path
      
    const workout = await Workout.create({
      title,
      category,
      description,
      videoUrl,
    });

    res.status(201).json({
      success: true,
      workout,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getWorkouts = async(req,res)=>{
    try {
        const workouts = await Workout.find();
        res.json({
            success:true,
            workouts,
        })
    } catch (error) {
        res.status(500).json({
            success:false
        })
    }
}

const deleteWorkout = async (req,res)=>{
    try {
        const workouts = await Workout.findByIdAndDelete(req.params.id)
        res.json({
            success:true,
            message:"Deleted Successfuly"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
        })
    }


}

export  {addWorkout,getWorkouts,deleteWorkout}