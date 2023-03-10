import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    role:{
        type: Array,
        default: ["ROLE_STUDENT"],
        required: true,
    },
    status:{
        type: String,
        default: "MODERATION",
        required: true,
    },
    passwordHash:{
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

export default mongoose.model('User', UserSchema)