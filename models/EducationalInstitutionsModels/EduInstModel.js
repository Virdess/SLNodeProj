import mongoose from "mongoose";

const EduInstSchema = new mongoose.Schema({
    eduInstName:{
        type: String,
        required: true,
    }
})

export default mongoose.model('EduInst', EduInstSchema)