import express from 'express'
import multer from 'multer';
import mongoose from 'mongoose';

import {registerValidation,loginValidation,postCreateValidation} from './validations/validations.js'

import checkAuth from './utils/checkAuth.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

import * as UserController from './Controllers/UserController.js'
import * as PostsController from './Controllers/PostsController.js'

//Я не знаю, зачем это, это посоветовал сделать сам монгуст
mongoose.set('strictQuery', false);

//
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

//Учим экспресс приложение работать с json
app.use(express.json())

//Объясняем express что при любой ссылке /uploads надо выдать сам файл
app.use('/uploads', express.static('uploads'))

//Проверочный эедпоинт, для просмотра работает ли сервер
app.get('/', (req, res) =>{
    return res.send('OK')
})

//Эндпоинты для работы с регистрацией и аутентификацией
app.post('/auth/login', loginValidation, handleValidationErrors,UserController.login)
app.post('/reg', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

//Эндпоинт для загрузки файлов (в момент 13.01.2023 для загрузки аватарок)
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

//Эндпоинты для CRUD логики записей (можно использовать такой же для создания расписаний)
app.get('/posts', PostsController.getAll)
app.get('/posts/:id', PostsController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostsController.create)
app.patch('/posts/:id', checkAuth, postCreateValidation, PostsController.update)
app.delete('/posts/:id', checkAuth, PostsController.remove)

//Запуск приложения
app.listen(4444, (err) => {
    if(err){
        return console.log(err)
    }
    console.log('server OK')
});