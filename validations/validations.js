import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('fullName', 'Укажите имя (мин. 3 смвола)').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи (Мин. 3 символа)').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи (Мин. 10 символов)').isLength({min: 10}).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]