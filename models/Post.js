import mongoose, { mongo } from "mongoose";




const commentSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    
    },
    text:{
      type:String,
      required:true,
      trim:true,
    },
  },
  {timestamps:true}
);

const postSchema = new mongoose.Schema(
{
    title:String,
    description:String,
    mediaUrl:String,
    mediaType:{
        type:String,
        enum:["image","video"],
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    },
    likes:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
      },
    ],
    comments:[commentSchema],
  

},
{timestamps:true}
);
const Post = mongoose.model("Post",postSchema)
export default Post