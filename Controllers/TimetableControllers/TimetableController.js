import TimetableModel from '../../models/TimetableModels/Timetable.js';


export const create = async(req, res) => {
    try {

        const doc = new TimetableModel({
            timetableNum: req.body.timetableNum,
            lesson: req.body.lesson,
            timeStart: req.body.timeStart,
            timeEnd: req.body.timeEnd,
            day: req.body.day,
        })

        const timetable = await doc.save();

        res.json(timetable)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось зарегистрироваться'
        })
    }
}

export const getAll = async (req, res) =>{
    try {
        const timetables = await TimetableModel.find()
        res.json(timetables)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getOneByID = async (req, res) =>{
    try {
        const timetableId = req.params.id
        const timetable = await TimetableModel.findOne({
            _id: timetableId
        })

        if(!timetable){
            return res.status(404).json({
                message:'Предмет не найден',
            })
        }

        res.json({timetable})
    } catch (error) {
        console.log(error)
    }

}
export const getOneByName = async (req, res) =>{
    try {
        const day = req.params.day
        const timetable = await TimetableModel.findOne({
            day: day
        })

        if(!timetable){
            return res.status(404).json({
                message:'Предмет не найден',
            })
        }

        res.json({timetable})
    } catch (error) {
        console.log(error)
    }

}

export const remove = async (req, res) =>{
    try {
        const timetableId = req.params.id
        TimetableModel.findByIdAndDelete({
            _id: timetableId
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