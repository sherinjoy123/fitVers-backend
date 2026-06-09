import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// REGISTER
const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body

    const userExist = await User.findOne({ email })

    if (userExist) {
      return res.status(400).json({ message: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: "User registered successfully",
      user
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// login
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Invalid email" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic
      }
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// getprofile
const getprofile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// update profile
const updateProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (req.body.name) {
      user.name = req.body.name
    }

    if (req.file) {
      user.profilePic =
        `http://localhost:4000/uploads/${req.file.filename}`
    }

    const updatedUser = await user.save()

    res.json({
      message: "Profile updated",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profilePic: updatedUser.profilePic
      }
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUserId = async (req,res)=>{
  try {
    const user = await User.findById(req.params.id)

    if(!user){
      return res.status(404).json({
        successP:false,
        message:"User not found"
      })
    }

    res.json({
      success:true,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}

export {registerUser,loginUser,getprofile,updateProfile ,getUserId}