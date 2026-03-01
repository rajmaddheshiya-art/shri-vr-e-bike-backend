import mongoose from "mongoose";

const connectDB = async(req,res)=>{
    try {
        let data = await mongoose.connect(process.env.MONGO_URL)
        console.log("DATABASE CONNECTED")
    } catch (error) {
        console.log(`DATABASE ERROR ${error}`)
    }
}

export default connectDB