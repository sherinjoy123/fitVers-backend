import Post from "../models/Post.js"
import User from "../models/User.js"

const createPost = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    console.log(req.user);
    const { title, description, mediaType } = req.body

    const post = await Post.create({
      title,
      description,
      mediaUrl: req.file
        ? `uploads/${req.file.filename}`
        : "",
      mediaType,
      createdBy: req.user?.id   // 🔥 safer access
    })
    await post.save()

    return res.status(201).json({message:"post created"})

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getPosts = async(req,res)=>{
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}

const deletePost = async(req,res)=>{
    try {
      const post = await Post.findById(req.params.id)
      if(!post){
        return res.status(404).json("post not found")
      }
      await post.deleteOne()
      res.status(200).json("Deleted succesfuly")
    } catch (error) {
      res.status(500).json(error.message)
    }
}

const likePost = async (req,res) =>{
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userId = req.user.id;

    const alreadyLiked = post.likes.some(
      (id)=> id.toString() === userId
    );
    if(alreadyLiked){
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    }else{
      post.likes.push(userId)
    }
    await post.save();
    res.json({
      success:true,
      likes:post.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    });
  }
}

const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const user = await User.findById(req.user.id).select("name");

    const comment = {
      userId: req.user.id,
      userName: user?.name || "User",
      text,
    };

    post.comments = post.comments || [];
    post.comments.push(comment);

    await post.save();

    res.json({
      success: true,
      comments: post.comments,
    });
  } catch (error) {
    console.log(error); // 🔥 important for debugging
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createPost,getPosts,deletePost,likePost,addComment}