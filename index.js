import express from "express"
import dotenv from "dotenv"
import connectDB from "./Database/db.js"
import authRouter from "./route/router.js"
import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config()

const port = process.env.PORT || 5000
const app = express()

app.use(cors({
    origin: ["https://shri-vr-e-bike.co.in", "https://www.shri-vr-e-bike.co.in"],
    methods:["GET", "POST"],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use(authRouter)



app.listen(port,()=>{
    connectDB()
    console.log(`SERVER LISTENING ${port}`)
})
