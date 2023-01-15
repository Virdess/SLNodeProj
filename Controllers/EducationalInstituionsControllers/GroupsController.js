import GroupsModel from '../../models/EducationalInstitutionsModels/GroupsModel.js';


export const groupCreate = async(req, res) => {
    try {

        const doc = new GroupsModel({
            groupName: req.body.groupName,
        })

        const group = await doc.save();

        res.json(group)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось создать группу'
        })
    }
}

export const groupGetOneByID = async (req, res) =>{
    try {
        const groupId = req.params.id
        const group = await GroupsModel.findOne({
            _id: groupId
        })

        if(!group){
            return res.status(404).json({
                message:'Группа не найдена',
            })
        }

        res.json({group})
    } catch (error) {
        console.log(error)
    }

}
export const groupGetOneByName = async (req, res) =>{
    try {
        const groupName = req.params.groupName
        const group = await GroupsModel.findOne({
            groupName: groupName
        })

        if(!group){
            return res.status(404).json({
                message:'Группа не найдена',
            })
        }

        res.json({group})
    } catch (error) {
        console.log(error)
    }

}

export const groupDelete = async (req, res) =>{
    try {
        const groupId = req.params.id
        GroupsModel.findByIdAndDelete({
            _id: groupId
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

export const groupGetAll = async (req, res) =>{
    try {
        const groups = await GroupsModel.find()
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось получить группы'
        })
    }
}