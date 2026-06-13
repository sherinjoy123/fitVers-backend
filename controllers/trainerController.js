import Trainer from "../models/trainer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import Booking from "../models/booking.js"

const createTrainer = async (req, res) => {

  const {
    name,
    email,
    password,
    phone,
    price,
    description,
    specialization,
    experience,
  } = req.body

  try {

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const trainer = await Trainer.create({
      name,
      email,
      password: hashedPassword,
      phone,
      price,
      specialization,
      experience,
      description,
      profilePic: req.file.path
        
    })

    res.status(201).json(trainer)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: error.message,
    })

  }
}
// getall trainer

const getTrainer = async (req,res)=>{
    try {
        const trainer = await Trainer.find()
        res.status(200).json(trainer)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// delete tariner

const deleteTrainer = async(req,res)=>{
    try {
        const trainer = await Trainer.findByIdAndDelete(req.params.id)
        res.json("trainer deleted")
    } catch (error) {
         
        res.status(500).json(error.message)
    }
}

// UPDATE TRAINER
const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    // SAFE UPDATES
    trainer.name = req.body.name ?? trainer.name;
    trainer.specialization = req.body.specialization ?? trainer.specialization;
    trainer.experience = req.body.experience ?? trainer.experience;
    trainer.price = req.body.price ?? trainer.price;
    trainer.description = req.body.description ?? trainer.description;

    // IMAGE UPDATE (SAFE)
    if (req.file ) {
      trainer.profilePic = req.file.path;
    }

    const updatedTrainer = await trainer.save();

    return res.json({
      success: true,
      trainer: updatedTrainer,
    });

  } catch (error) {
    console.log("UPDATE TRAINER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const trainerLogin = async (req, res) => {

  try {

    const { email, password } = req.body

    console.log("Email",email);

    const trainer = await Trainer.findOne({
      email,
    })

    console.log("Trainer",trainer);

    if (!trainer) {
      return res.status(400).json({
        success: false,
        message: "Trainer not found",
      })
    }

    const isMatch =
      await bcrypt.compare(
        password,
        trainer.password
      )

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    const token = jwt.sign(
      {
        id: trainer._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    )

    res.json({
      success: true,
      token,
      trainer,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }

}
const getTrainerBooking = async (req, res) => {
  try {

    console.log("Trainer Login:",req.trainer);
    const trainerId = req.trainer.id; // IMPORTANT (from JWT)

    

    const bookings = await Booking.find({
      trainer: trainerId,
    })
    .populate("user")

    console.log("Bookings Data:");
    console.log(JSON.stringify(bookings, null, 2));
    

    res.json({
      success: true,
      booking: bookings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {createTrainer,getTrainer,updateTrainer,deleteTrainer,trainerLogin,getTrainerBooking}