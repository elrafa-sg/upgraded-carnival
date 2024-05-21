import express from 'express'

import './dotenv.config'
import router from './routes/index'

const app = express()
app.use(express.json())

app.use(router)

app.listen(3000, () => console.log('app rodando...'))