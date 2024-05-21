import express from 'express'
import { userRouter } from './routes/userRouter.js'
import { authRouter } from './routes/authRouter.js'
import { vehicleRouter } from './routes/vehicleRouter.js'

const app = express()
app.use(express.json())

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/vehicle', vehicleRouter)

app.listen(3000, () => console.log('app rodando...'))