import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Post from "../models/Post.js"
import Trainer from "../models/trainer.js"
import Booking from "../models/booking.js"


const adminLogin = async (req, res) => {

  try {

    const { email, password } = req.body

    const admin = await User.findOne({ email })

    if (!admin) {
      return res.status(404).json("Admin not found")
    }

    if (!admin.isAdmin) {
      return res.status(401).json("Not authorized as admin")
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    )

    if (!isMatch) {
      return res.status(401).json("Invalid credentials")
    }

    const token = jwt.sign(
      {
        id: admin._id,
        isAdmin: admin.isAdmin
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    )

    res.status(200).json({
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        isAdmin: admin.isAdmin
      },
      token
    })

  } catch (error) {

    res.status(500).json(error.message)

  }

}


//dashboard Stats

const getDashboardStates = async(req,res)=>{
  try {
    const totalUser = await User.countDocuments()
    const totalPost = await Post.countDocuments()
    const totalTrainer = await Trainer.countDocuments()

    res.status(200).json({
      totalUser,
      totalPost,
      totalTrainer
    })
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}
// getall users

const getUsers = async(req,res)=>{
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}


// deleteuser

const deleteUser = async(req,res)=>{
  try {
    const users = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message:"user deleted "
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
  })
}
}


const getAllBookingsAdmin = async (req,res) =>{
  try {
    const booking = await Booking.find()
    .populate("user","name email profilePic phone ")
    

    res.json({
      success:true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}
export { adminLogin,getAllBookingsAdmin ,getDashboardStates,deleteUser,getUsers}