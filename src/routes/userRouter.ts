import express from 'express'
import { UserController } from '../controllers/userController'

const userRouter = express.Router()

userRouter.post('/sign-up', UserController.createUser)

export { userRouter }
