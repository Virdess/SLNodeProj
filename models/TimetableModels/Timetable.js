import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema({
    timetableNum:{
        type: Number,
        required: true,
    },
    lesson:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true,
    },
    timeStartHour:{
        type: Number,
        required: true
    },
    timeEndHour:{
        type: Number,
        required: true
    },
    timeStartMinute:{
        type: Number,
        required: true
    },
    timeEndMinute:{
        type: Number,
        required: true
    },
    day:{
        type: String,
        required: true
    },
    updateStatus:{
        type: Boolean,
    },
    group:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
})

export default mongoose.model('Timetable', TimetableSchema)