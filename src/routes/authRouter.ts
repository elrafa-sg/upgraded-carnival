import express from 'express'

import { AuthController } from '../controllers/authController'

const authRouter = express.Router()

authRouter.post('/sign-in', AuthController.authUser)

export { authRouter }
