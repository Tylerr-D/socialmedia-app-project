const cors = require("cors")
const express = require("express")
const fileUpload = require("express-fileupload")
const mongoose = require("mongoose")
const postModel = require("./models/post.model")
const uploadFile = require("./services/storage.service")

const app = express()

// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" })
})

// Create a new post
app.post("/posts", async (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: "Image is required" })
  }

  if (!req.body.caption) {
    return res.status(400).json({ message: "Caption is required" })
  }

  try {
    const uploaded = await uploadFile(req.files.image)

    const post = await postModel.create({
      image: uploaded.url,
      caption: req.body.caption
    })

    res.status(201).json({ message: "Post created", post })
  } catch (err) {
    res.status(500).json({ message: "Could not create post", error: err.message })
  }
})

// Get all posts (newest first)
app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find().sort({ _id: -1 })
    res.json({ message: "Posts fetched", posts })
  } catch (err) {
    res.status(500).json({ message: "Could not fetch posts", error: err.message })
  }
})

// Delete a post
app.delete("/posts/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid post id" })
  }

  try {
    const post = await postModel.findByIdAndDelete(req.params.id)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.json({ message: "Post deleted" })
  } catch (err) {
    res.status(500).json({ message: "Could not delete post", error: err.message })
  }
})

// Update a post's caption
app.patch("/posts/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid post id" })
  }

  if (!req.body.caption) {
    return res.status(400).json({ message: "Caption is required" })
  }

  try {
    const post = await postModel.findByIdAndUpdate(
      req.params.id,
      { caption: req.body.caption },
      { new: true }
    )

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.json({ message: "Post updated", post })
  } catch (err) {
    res.status(500).json({ message: "Could not update post", error: err.message })
  }
})

module.exports = app