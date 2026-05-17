const mongoose = require("mongoose")
 
// Each post has an image URL and a caption
const postSchema = new mongoose.Schema({
  image: String,
  caption: String
})
 
const Post = mongoose.model("Post", postSchema)
 
module.exports = Post
