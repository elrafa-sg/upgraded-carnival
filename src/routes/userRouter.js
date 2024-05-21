import express from 'express'
import { UserController } from '../controllers/UserController.js'

const userRouter = express.Router()

userRouter.post('/sign-up', UserController.createUser)

export { userRouter }
