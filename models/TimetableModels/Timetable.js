import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema({
    lesson:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true,
    },
    timeStart:{
        type: String,
        required: true
    },
    timeEnd:{
        type: String,
        required: true
    },
    day:{
        type: String,
        required: true
    }
})

export default mongoose.model('Timetable', TimetableSchema)