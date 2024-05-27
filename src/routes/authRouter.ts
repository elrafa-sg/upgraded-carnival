import express from 'express'

import { AuthController } from '../controllers/authController'
import { signInMiddleware } from '../middlewares/signInMiddleware'

const authRouter = express.Router()

authRouter.post('/sign-in', signInMiddleware, AuthController.authUser)

export { authRouter }
