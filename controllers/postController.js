import Post from "../models/Post.js"

const createPost = async (req, res) => {
  try {

    const { title, description, mediaType } = req.body

    const post = await Post.create({
      title,
      description,
      mediaUrl:req.file.path,
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

export { createPost,getPosts,deletePost }