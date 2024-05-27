import express from 'express'
import { UserController } from '../controllers/userController'
import { signUpMiddleware } from '../middlewares/signUpMiddleware'

const userRouter = express.Router()

userRouter.post('/sign-up', signUpMiddleware, UserController.createUser)

export { userRouter }
