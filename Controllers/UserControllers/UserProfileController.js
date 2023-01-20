import ProfileModel from '../../models/UserModels/UserProfile.js';


export const profileCreate = async(req, res) => {
    try {
        const doc = new ProfileModel({
            firstName: req.body.firstName,
            midName: req.body.midName,
            lastName: req.body.lastName,
            user: req.userID,
        })

        const userProfile = await doc.save();

        res.json(userProfile)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось зарегистрировать профиль'
        })
    }
}

export const profileGetMe = async (req, res) =>{
    try {
        const lessonId = req.params.id
        const lesson = await ProfileModel.findOne({
            _id: lessonId
        })

        if(!lesson){
            return res.status(404).json({
                message:'Профиль не найден',
            })
        }

        res.json({lesson})
    } catch (error) {
        console.log(error)
        return res.status(500).json('Не удалось получить профиль')
    }

}