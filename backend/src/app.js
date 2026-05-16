const express = require(`express`)
const mongoose = require("mongoose")
const postModel = require("./models/post.model")
const uploadFile = require("./services/storage.service")
const fileUpload = require("express-fileupload")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(fileUpload())
app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json({
    message: "backend is running"
  })
})

app.post("/posts",async(req,res)=>{
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        message: "image is required"
      })
    }

    if (!req.body.caption) {
      return res.status(400).json({
        message: "caption is required"
      })
    }

    const file = req.files.image
    const caption = req.body.caption
    const result = await uploadFile(file)
    
    const post = await postModel.create({
        image:result.url,
        caption:caption
    })

    res.status(201).json({
        message:"post ban gaya",
        post
         
    })
  } catch (error) {
    res.status(500).json({
      message: "post create nahi hua",
      error: error.message
    })
  }
})

app.get("/posts",async(req,res)=>{
  try {
   const posts =   await postModel.find().sort({ _id: -1 })

   res.status(200).json({
    message:"post mil gaya mere dost",
    posts:posts
   })
  } catch (error) {
    res.status(500).json({
      message: "posts nahi mile",
      error: error.message
    })
  }
})

app.delete("/posts/:id",async(req,res)=>{
try {

const id = req.params.id

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
        message:"invalid post id"
    })
}

const post = await postModel.findOneAndDelete({
    _id : id
})

if (!post) {
    return res.status(404).json({
        message:"post nahi mila"
    })
}

res.status(200).json({
    message:"post delete hogya dost"
})
} catch (error) {
    res.status(500).json({
        message:"post delete nahi hua",
        error:error.message
    })
}


})

app.patch("/posts/:id",async(req,res)=>{
try {

const id = req.params.id

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
        message:"invalid post id"
    })
}

if (!req.body.caption) {
    return res.status(400).json({
        message:"caption is required"
    })
}

const post = await postModel.findOneAndUpdate(
  { _id: id },
  { caption: req.body.caption },
  { new: true }
)

if (!post) {
    return res.status(404).json({
        message:"post nahi mila"
    })
}

res.status(200).json({
    message:"post update hogya dost",
    post
})
} catch (error) {
    res.status(500).json({
        message:"post update nahi hua",
        error:error.message
    })
}

})
module.exports = app
