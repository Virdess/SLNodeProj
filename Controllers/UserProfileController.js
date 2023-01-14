import ProfileModel from '../models/UserProfile.js';


export const profileCreate = async(req, res) => {
    try {
        const doc = new ProfileModel({
            firstName: req.body.firstName,
            midName: req.body.midName,
            lastName: req.body.lastName,
            role: req.body.role,
            user: req.userID,
        })

        const userProfile = await doc.save();

        res.json(userProfile)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось зарегистрироваться'
        })
    }
}

export const profileGetMe = async (req, res) =>{
    try {
        const user = await UserModel.findById(req.userID)

        if(!user){
            return res.status(404).json({
                message:'Пользователь не найден',
            })
        }

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,})
    } catch (error) {
        console.log(error)
    }

}