import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
    lessonName:{
        type: String,
        required: true,
    }
})

export default mongoose.model('Lesson', LessonSchema)