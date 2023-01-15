import mongoose from "mongoose";

const GroupsSchema = new mongoose.Schema({
    groupName:{
        type: String,
        required: true,
    }
})

export default mongoose.model('Group', GroupsSchema)