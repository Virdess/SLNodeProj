import mongoose from "mongoose";

const UserProfieSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    midName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        unique:true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //avatarUrl: String,
}, {
    timestamps: true,
})

export default mongoose.model('UserProfile', UserProfieSchema)