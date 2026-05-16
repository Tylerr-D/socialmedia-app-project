require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/db/db")

const PORT = process.env.PORT || 3000

connectDB()
  .then(() => {
    app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("database connection failed:", error.message)
    process.exit(1)
})

