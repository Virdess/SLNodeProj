import express from 'express'
import multer from 'multer';
import mongoose from 'mongoose';

import {registerValidation,loginValidation,postCreateValidation} from './validations/validations.js'

import checkAuth from './utils/checkAuth.js';

import * as UserController from './Controllers/UserController.js'
import * as PostsController from './Controllers/PostsController.js'
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose.set('strictQuery', false);

mongoose.connect(
    'mongodb+srv://Virdesss:MyAss252181@cluster0.tbpq5tf.mongodb.net/blog?retryWrites=true&w=majority'
    ).then(()=>{
        console.log("DB OK")
    }).catch((err)=>{
        console.log('!!!DB ERROR: ' + err)
    })

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null, 'uploads')
    },
    filename:(_, file, cb) =>{
        cb(null, file.originalname)
    },
})

const upload = multer({
    storage
})

app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) =>{
    return res.send('OK')
})

app.post('/auth/login', loginValidation, handleValidationErrors,UserController.login)
app.post('/reg', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.post('/posts', checkAuth, postCreateValidation, PostsController.create)
app.get('/posts', PostsController.getAll)
app.get('/posts/:id', PostsController.getOne)
app.delete('/posts/:id', checkAuth, PostsController.remove)
app.patch('/posts/:id', checkAuth, PostsController.update)




app.listen(4444, (err) => {
    if(err){
        return console.log(err)
    }
    console.log('server OK')
});