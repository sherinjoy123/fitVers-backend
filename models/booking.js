import mongoose  from "mongoose";


const bookingSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        trainer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Trainer"
        },
        amount:{
            type:Number,
            required:true
        },

        paymentStatus:{
            type:String,
            default:"pending",
        },

        razorpay_order_id: String,

        razorpay_payment_id: String,

        razorpay_signature:String,
    },
    {timestamps: true}
)

const Booking = mongoose.model("Booking",bookingSchema)
export default Booking

