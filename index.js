import express from 'express'
import multer from 'multer';
import mongoose from 'mongoose';

import {registerValidation,loginValidation,postCreateValidation} from './validations/validations.js'

import checkAuth from './utils/checkAuth.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

import {UserController, PostsController, LessonController, UserProfileController, GroupController} from './Controllers/ControllersIndex.js'

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
app.post('/auth/reg', registerValidation, handleValidationErrors, UserController.register)//     ######TODO######        роли пользователей (Преподаватель, студент, админ, супервайзер)
app.get('/auth/me', checkAuth, UserController.getMe)
app.get('/profile/:id', checkAuth, UserProfileController.profileGetMe)
app.post('/profile', checkAuth, UserProfileController.profileCreate)
//app.patch('/profile', checkAuth, UserProfileController.profileUpdate)


//Эндпоинт для обновления данных профиля ######TODO######
//app.patch('/profile', checkAuth, UserProfileController.profileUpdate)

//Эндпоинт для модерации аккаунтов при регистрации (Модерирующий пользователь - супервайзер/админ)


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
//get userposts
app.delete('/posts/:id', checkAuth, PostsController.remove)

//Эндпоинты для логики предметов (уроков)
app.get('/lesson/:id', LessonController.lessonGetById)
app.get('/lesson/name/:lessonName', LessonController.lessonGetByName)
app.post('/lesson', LessonController.lessonCreate)
//app.get('/lessons', LessonController.lessonGetAll)
//app.patch('/lesson/:id', LessonController.lessonUpdate)
app.delete('/lesson/:id', LessonController.lessonDelete)

//Эндпоинты для создания групп    ######TODO######
app.get('/groups', checkAuth, GroupController.groupGetAll)
app.get('/group/:id', checkAuth, GroupController.groupGetOneByID)
app.get('/group/name/:groupName', checkAuth, GroupController.groupGetOneByName)
app.post('/group', checkAuth, GroupController.groupCreate)
app.delete('/group/:id', GroupController.groupDelete)
//app.patch('/group', checkAuth, GroupController.groupUpdate)

//Эндпоинты для расфасовки (чёбля) студентов по группам

//Эндпоинты для создания учебных завадений (С проверкой на админа)      ######TODO######
//app.get('/enduinsts', checkAuth, EduInstController.groupGetAll)
//app.get('/enduinsts/:id', checkAuth, EduInstController.groupGetOneByID)
//app.get('/enduinsts/:name', checkAuth, EduInstController.groupGetOneByName)
//app.post('/enduinsts', checkAuth, EduInstController.groupCreate)
//app.patch('/enduinsts', checkAuth, EduInstController.groupUpdate)

//Эндпоинты для создания расписаний     ######TODO######
//app.get('/timetable', checkAuth, TimetableController.groupGetAll)
//app.get('/timetable/:id', checkAuth, TimetableController.groupGetOneByID)
//app.get('/timetable/:name', checkAuth, TimetableController.groupGetOneByName)
//app.post('/timetable', checkAuth, TimetableController.groupCreate)
//app.patch('/timetable', checkAuth, TimetableController.groupUpdate)

//Эндпоинты для прикрепления комментариев к предметам     ######TODO######

//Эндпоинты для оценок     ######TODO######
//app.get('/marks', checkAuth, MarkController.groupGetAll)
//app.get('/marks/:id', checkAuth, MarkController.groupGetOneByID)
//app.get('/marks/:name', checkAuth, MarkController.groupGetOneByName)
//app.post('/marks', checkAuth, MarkController.groupCreate)
//app.patch('/marks', checkAuth, MarkController.groupUpdate)

//Эндпоинты для qr      ######TODO######
//generating endpoints
//scanning endpoints

//Запуск приложения
app.listen(4444, (err) => {
    if(err){
        return console.log(err)
    }
    console.log('server OK')
});