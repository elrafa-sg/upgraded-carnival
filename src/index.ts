import express from 'express'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'

import './dotenv.config'
import router from './routes/index'

import swaggerDocs from '../swagger.json'

const API_PORT = process.env.API_PORT ?? 3001

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

// swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(API_PORT, () => console.log(`app rodando na porta ${API_PORT}`))