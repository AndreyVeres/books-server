import { Router } from 'express'
import authController from '../controller/authController.js'
import { check } from 'express-validator'
import authmiddleware from '../middleware/auth.middleware.js';
const authRouter = Router();

authRouter.post('/register',
  [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен содержать от 4 до 10 символов').isLength({ min: 4, max: 10 })
  ],
  authController.registration)
authRouter.post('/login', authController.login)
authRouter.get('/auth', authmiddleware, authController.auth)

export default authRouter
