import { createRequire } from 'module';
const require = createRequire(import.meta.url);



export const generateAsSymbols = async (req, res) =>{
    try {
        const QRCode = require('qrcode')

        // Creating the data
        let data = {
            userID: req.userID,
        }

        // Converting the data into String format
        let stringdata = JSON.stringify(data)

        QRCode.toString(stringdata,{type:''},
        function (err, QRcode) {

            if(err) return res.json("error occurred")

            return res.send(QRcode)
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}


export const generateAsString = async (req, res) =>{
    try {
        const QRCode = require('qrcode')

        // Creating the data
        let data = {
            userID: req.userID,
        }

        // Converting the data into String format
        let stringdata = JSON.stringify(data)

        QRCode.toDataURL(stringdata, function (err, code) {
        if(err) return console.log("error occurred")

        return res.send(code)
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}
