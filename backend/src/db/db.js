const mongoose = require("mongoose")

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in .env")
  }

  await mongoose.connect(process.env.MONGODB_URI)
  console.log("Connected to database")
}

module.exports = connectDB