import express from 'express'
import { UserController } from '../controllers/UserController.js'

const userRouter = express.Router()

userRouter.post('/sign-in', UserController.createUser)

export { userRouter }
