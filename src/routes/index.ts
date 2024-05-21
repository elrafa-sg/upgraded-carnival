import express from 'express'

import { authRouter } from './authRouter'
import { userRouter } from './userRouter'
import { vehicleRouter } from './vehicleRouter'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/vehicle', vehicleRouter)

export default router