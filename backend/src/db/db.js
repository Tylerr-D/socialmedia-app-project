const mongoose = require(`mongoose`)

async function connectDB(){
    const mongoUri = process.env.MONGODB_URI

    if (!mongoUri) {
        throw new Error("MONGODB_URI is missing in .env")
    }

    await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000
    })

    console.log("connected to db")
}

module.exports = connectDB
