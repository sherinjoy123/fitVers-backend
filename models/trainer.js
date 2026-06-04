import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
    name:{
        type:"String",
        required:"true",
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
      
      password: {
        type: String,
        required: true,
      },
    phone:{
        type:"String"
    },
    specialization:{
        type:"String",

    },
    experience:{
        type:"Number"
    },
    price:{
        type:"Number",

    },
     description: {
        type: String
      },
    
    profilePic:{
        type:"String"
    }


} ,{timestamps:true}

)

const Trainer  = mongoose.model("Trainer",trainerSchema)
export default Trainer;