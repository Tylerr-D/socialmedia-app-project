const mongoose = require(`mongoose`)

const noteSchema = new mongoose.Schema({
    image:String,
    caption:String
})

const postModel = mongoose.model("post",noteSchema)

module.exports = postModel
