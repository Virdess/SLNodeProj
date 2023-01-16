import mongoose from "mongoose";

const GroupsSchema = new mongoose.Schema({
    groupName:{
        type: String,
        required: true,
    },
    eduInst:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EduInst',
        required: true,
    },
})

export default mongoose.model('Group', GroupsSchema)