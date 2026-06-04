import mongoose from "mongoose";

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
  

},
{timestamps:true}
);
const Post = mongoose.model("Post",postSchema)
export default Post