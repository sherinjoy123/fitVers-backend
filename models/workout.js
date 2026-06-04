import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,

        },
        category:{
            type:String,
            required:true,
        },
        videoUrl:{
            type:String,
            
        },
       description:{
            type:String,
            required:"true"
        },

    },
    {timestamps: true}
);
const Workout = mongoose.model("Workout",workoutSchema)

export default Workout