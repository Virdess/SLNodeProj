import EduInstModel from '../../models/EducationalInstitutionsModels/EduInstModel.js';


export const create = async(req, res) => {
    try {

        const doc = new EduInstModel({
            eduInstName: req.body.eduInstName,
        })

        const eduInst = await doc.save();

        res.json(eduInst)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось создать группу'
        })
    }
}

export const getOneByID = async (req, res) =>{
    try {
        const eduInstId = req.params.id
        const eduInst = await EduInstModel.findOne({
            _id: eduInstId
        })

        if(!eduInst){
            return res.status(404).json({
                message:'Группа не найдена',
            })
        }

        res.json({eduInst})
    } catch (error) {
        console.log(error)
    }

}
export const getOneByName = async (req, res) =>{
    try {
        const eduInstName = req.params.eduInstName
        const eduInst = await EduInstModel.findOne({
            eduInstName: eduInstName
        })

        if(!eduInst){
            return res.status(404).json({
                message:'Группа не найдена',
            })
        }

        res.json({eduInst})
    } catch (error) {
        console.log(error)
    }

}

export const remove = async (req, res) =>{
    try {
        const eduInstId = req.params.id
        EduInstModel.findByIdAndDelete({
            _id: eduInstId
        },(error, doc) => {
            if (error) {
                return res.status(500).json({
                    message: 'Не удалось удалить группу'
                })
            }

            if (!doc) {
                 return res.status(404).json({
                    message:'Группа не найдена'
                 })
            }

            res.json({
                success: true
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось получить группы'
        })
    }
}

export const getAll = async (req, res) =>{
    try {
        const eduInst = await EduInstModel.find()
        res.json(eduInst)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось получить группы'
        })
    }
}