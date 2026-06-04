import Booking from "../models/booking.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto"


const createOrder = async(req,res)=>{
    try {
        const {trainerId,amount} = req.body

        const options = {
            amount:amount * 100,
            currency: "INR",
            receipt:`receipt_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options)

        const booking = await Booking.create({
            user: req.user.id,
            trainer:trainerId,
            amount,
            razorpay_order_id:order.id,
        })
        res.status(200).json({
            success: true,
            order,
            booking,
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// veridy payment controller

const verifyPayment = async (req, res) => {
    try {
  
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = req.body
  
      const body = razorpay_order_id + "|" + razorpay_payment_id
  
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex")
  
      if (expectedSignature === razorpay_signature) {
  
        await Booking.findOneAndUpdate(
          { razorpay_order_id },
          {
            paymentStatus: "paid",
            razorpay_payment_id,
            razorpay_signature,
          }
        )
  
        res.json({
          success: true,
          message: "Payment successful"
        })
  
      } else {
  
        res.status(400).json({
          success: false,
          message: "Payment failed",
        })
  
      }
  
    } catch (error) {
  
      res.status(500).json({
        success: false,
        message: error.message,
      })
  
    }
  }

//   getbooking

const getMyBooking = async(req,res)=>{
    try {
        const booking = await Booking.find({user:req.user.id,}).populate("trainer")

        res.status(200).json({
            success:true,
            booking,
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}




export {createOrder,verifyPayment,getMyBooking}
