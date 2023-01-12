import Jwt from "jsonwebtoken";

export default (req, res, next) =>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')

    if(token){
        try {
            const decoded = Jwt.verify(token, 'GAYGAYgay')
            req.userID = decoded._id;
            next()
        } catch (error) {
            return res.status(403).json({
                message:'Нет доступа'
            })
        }

    }
    else{
        return res.status(403).json({
            message:'Нет доступа'
        })
    }
}