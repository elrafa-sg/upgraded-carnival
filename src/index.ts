import express from 'express'
import swaggerUi from 'swagger-ui-express'

import './dotenv.config'
import router from './routes/index'

import swaggerDocs from '../swagger.json'

const app = express()
app.use(express.json())

app.use(router)

// swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(3000, () => console.log('app rodando...'))