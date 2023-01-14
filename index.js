import express from 'express'
import multer from 'multer';
import mongoose from 'mongoose';

import {registerValidation,loginValidation,postCreateValidation} from './validations/validations.js'

import checkAuth from './utils/checkAuth.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

import * as UserController from './Controllers/UserControllers/UserController.js'
import * as PostsController from './Controllers/SocialControllers/PostsController.js'
import * as LessonController from './Controllers/TimetableControllers/LessonController.js'
import * as UserProfileController from './Controllers/UserControllers/UserProfileController.js'

//Я не знаю, зачем это, это посоветовал сделать сам монгуст
mongoose.set('strictQuery', false);

//Подключение к базе данных
mongoose.connect(
    'mongodb+srv://Virdesss:MyAss252181@cluster0.tbpq5tf.mongodb.net/blog?retryWrites=true&w=majority'
    ).then(()=>{
        console.log("DB OK")
    }).catch((err)=>{
        console.log('!!!DB ERROR: ' + err)
    })

const app = express();

//Я не знаю доподлинно, как оно работает, вроде как работает над сохранением файлов
//#######TODO Сделать уникальные имена для каждого файла
const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null, 'uploads') //папка созранения
    },
    filename:(_, file, cb) =>{
        cb(null, file.originalname) //сохранение файла + даём ему имя получая оригинальное название файла через file.originalname
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

//Эндпоинты для работы с регистрацией и аутентификацией (в т.ч профилей)
app.post('/auth/login', loginValidation, handleValidationErrors,UserController.login)
app.post('/auth/reg', registerValidation, handleValidationErrors, UserController.register)
//     ######TODO######        роли пользователей (Преподаватель, студент, админ, супервайзер)
app.get('/auth/me', checkAuth, UserController.getMe)
app.get('/profile/:id', checkAuth, UserProfileController.profileGetMe)
app.post('/profile', checkAuth, UserProfileController.profileCreate)
//app.patch('/profile', checkAuth, UserProfileController.profileUpdate)

//Эндпоинт для обновления данных профиля ######TODO######

//Эндпоинт для модерации аккаунтов при регистрации


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

//Эндпоинты для логики предметов (уроков)
app.get('/lesson/:id', LessonController.lessonGetById)
app.get('/lesson/name/:lessonName', LessonController.lessonGetByName)
app.post('/lesson', LessonController.lessonCreate)
//app.get('/lessons', LessonController.lessonGetAll)
//app.patch('/lesson/:id', LessonController.lessonUpdate)
app.delete('/lesson/:id', LessonController.lessonDelete)

//Эндпоинты для создания групп    ######TODO######

//Эндпоинты для создания учебных завадений (С проверкой на админа)      ######TODO######

//Эндпоинты для создания расписаний     ######TODO######

//Эндпоинты для прикрепления комментариев к предметам     ######TODO######

//Эндпоинты для оценок     ######TODO######

//Эндпоинты для qr      ######TODO######

//Запуск приложения
app.listen(4444, (err) => {
    if(err){
        return console.log(err)
    }
    console.log('server OK')
});