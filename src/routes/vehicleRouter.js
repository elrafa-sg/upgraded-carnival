import express from 'express'
import { VehicleController } from '../controllers/vehicleController.js'

import { authMiddleware } from '../middlewares/authMiddleware.js'

const vehicleRouter = express.Router()

vehicleRouter.post('/', authMiddleware, VehicleController.createVehicle)
vehicleRouter.get('/', authMiddleware, VehicleController.getAllVehicles)

export { vehicleRouter }
