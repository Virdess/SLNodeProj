import LessonModel from '../../models/TimetableModels/Lesson.js';


export const lessonCreate = async(req, res) => {
    try {

        const doc = new LessonModel({
            lessonName: req.body.lessonName,
        })

        const lesson = await doc.save();

        res.json(lesson)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось зарегистрироваться'
        })
    }
}

export const lessonGetById = async (req, res) =>{
    try {
        const lessonId = req.params.id
        const lesson = await LessonModel.findOne({
            _id: lessonId
        })

        if(!lesson){
            return res.status(404).json({
                message:'Предмет не найден',
            })
        }

        res.json({lesson})
    } catch (error) {
        console.log(error)
    }

}
export const lessonGetByName = async (req, res) =>{
    try {
        const lessonName = req.params.lessonName
        const lesson = await LessonModel.findOne({
            lessonName: lessonName
        })

        if(!lesson){
            return res.status(404).json({
                message:'Предмет не найден',
            })
        }

        res.json({lesson})
    } catch (error) {
        console.log(error)
    }

}

export const lessonDelete = async (req, res) =>{
    try {
        const lessonId = req.params.id
        LessonModel.findByIdAndDelete({
            _id: lessonId
        },(error, doc) => {
            if (error) {
                return res.status(500).json({
                    message: 'Не удалось удалить предмет'
                })
            }

            if (!doc) {
                 return res.status(404).json({
                    message:'Предмет не найден'
                 })
            }

            res.json({
                success: true
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось получить предметы'
        })
    }
}

export const lessonGetAll = async (req, res) =>{
    try {
        const lessons = await LessonModel.find()
        res.json(lessons)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}