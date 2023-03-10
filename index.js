import express from 'express'
import multer from 'multer';
import mongoose from 'mongoose';

import {registerValidation,loginValidation,postCreateValidation} from './validations/validations.js'

import checkAuth from './utils/checkAuth.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

import {UserController, PostsController, LessonController, UserProfileController, GroupController, EduInstController, TimetableController, QRCodeController} from './Controllers/ControllersIndex.js'




//Я не знаю, зачем это, это посоветовал сделать сам монгуст
mongoose.set('strictQuery', false);

//Подключение к базе данных
mongoose.connect(
    'mongodb://yourURL'
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
        cb(null, 'uploads') //папка сохранения
    },
    filename:(req, file, cb) =>{
        cb(null, req.userID + "-" + "profile" + ".jpg") //сохранение файла + даём ему имя получая оригинальное название файла через file.originalname
    },
})

const upload = multer({
    storage
})

//Объясняем express что при любой ссылке /uploads надо выдать сам файл
app.use('/uploads', express.static('uploads'))

//Эндпоинт для загрузки файлов (в момент 13.01.2023 для загрузки аватарок)
//На момент 20.01.2023 вырезано за ненадобностью на данный момент.
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.userID + "-" + "profile" + ".jpg"}`,
    })
})

//Учим экспресс приложение работать с json
app.use(express.json())


//Проверочный эедпоинт, для просмотра работает ли сервер
app.get('/', (req, res) =>{
    return res.send('OK')
})

//Эндпоинты для работы с регистрацией и аутентификацией (в т.ч профилей)
app.post('/auth/login', loginValidation, handleValidationErrors,UserController.login)
app.post('/auth/reg', registerValidation, handleValidationErrors, UserController.register)//     ######TODO######        роли пользователей (Преподаватель, студент, админ, супервайзер)
app.get('/auth/me', checkAuth, UserController.getMe)
app.get('/profile', checkAuth, UserProfileController.profileGetMe)
app.post('/profile', checkAuth, UserProfileController.profileCreate)
app.patch('/auth/me', checkAuth, UserController.editStatus)
//app.patch('/profile', checkAuth, UserProfileController.profileUpdate)


//Эндпоинт для обновления данных профиля ######TODO######
//app.patch('/profile', checkAuth, UserProfileController.profileUpdate)

//Эндпоинт для модерации аккаунтов при регистрации (Модерирующий пользователь - супервайзер/админ)



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
app.get('/lessons', LessonController.lessonGetAll)
//app.patch('/lesson/:id', LessonController.lessonUpdate)
app.delete('/lesson/:id', LessonController.lessonDelete)

//Эндпоинты для создания групп
app.get('/groups', checkAuth, GroupController.groupGetAll)
app.get('/group/:id', checkAuth, GroupController.groupGetOneByID)
app.get('/group/name/:groupName', checkAuth, GroupController.groupGetOneByName)
app.post('/group', checkAuth, GroupController.groupCreate)
app.delete('/group/:id', GroupController.groupDelete)
//app.patch('/group', checkAuth, GroupController.groupUpdate)

//Эндпоинты для создания учебных завадений (С проверкой на админа)      ######TODO######
app.get('/enduinsts', checkAuth, EduInstController.getAll)
app.get('/enduinsts/:id', checkAuth, EduInstController.getOneByID)
app.get('/enduinsts/name/:eduInstName', checkAuth, EduInstController.getOneByName)
app.post('/enduinsts', checkAuth, EduInstController.create)
//app.patch('/enduinsts', checkAuth, EduInstController.update)

//Эндпоинты для расфасовки (чёбля) студентов по группам

//Эндпоинты для создания расписаний     ######TODO######
app.get('/timetable', checkAuth, TimetableController.getAll)
app.get('/timetable/:id', checkAuth, TimetableController.getOneByID)
app.get('/timetable/name/:name', checkAuth, TimetableController.getOneByName)
app.post('/timetable', checkAuth, TimetableController.create)
app.patch('/timetable', checkAuth, TimetableController.remove)

//Эндпоинты для прикрепления комментариев к предметам     ######TODO######
//post
//get
//patch

//Эндпоинты для оценок     ######TODO######
//app.get('/marks', checkAuth, MarkController.groupGetAll)
//app.get('/marks/:id', checkAuth, MarkController.groupGetOneByID)
//app.get('/marks/:name', checkAuth, MarkController.groupGetOneByName)
//app.post('/marks', checkAuth, MarkController.groupCreate)
//app.patch('/marks', checkAuth, MarkController.groupUpdate)

//Эндпоинты для qr      ######TODO######
//generating endpoints
/************************* */
app.get('/qr_code/sym',checkAuth, QRCodeController.generateAsSymbols)
app.get('/qr_code/str',checkAuth, QRCodeController.generateAsString)
/************************* */


//scanning endpoints


//Эндпоинты для создания достижений (Загрузка изображений с подписью)

//Эндпоинты для чатов (пока что тех.поддержка)





















//Запуск приложения
app.listen(4444, (err) => {
    if(err){
        return console.log(err)
    }
    console.log('server OK')
});
