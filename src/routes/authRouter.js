import express from 'express'
import { AuthController } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/sign-in', AuthController.authUser)

export { authRouter }
