import { createRequire } from 'module';
const require = createRequire(import.meta.url);



export const generate = async (req, res) =>{
    try {
        const QRCode = require('qrcode')

        // Creating the data
        let data = {
            userID: req.userID,
        }

        // Converting the data into String format
        let stringdata = JSON.stringify(data)

        // Print the QR code to terminal
        QRCode.toString(stringdata,{type:''},
                function (err, QRcode) {

        if(err) return res.json("error occurred")

        // Printing the generated code
        console.log(QRcode)
        return res.send(QRcode)
        })

        // Converting the data into base64
        QRCode.toDataURL(stringdata, function (err, code) {
        if(err) return console.log("error occurred")

        // Printing the code
        console.log(code)
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}
// Require the package
