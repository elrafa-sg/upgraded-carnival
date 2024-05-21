import express from 'express'

import { authMiddleware } from '../middlewares/authMiddleware'
import { VehicleController } from '../controllers/vehicleController'

const vehicleRouter = express.Router()

vehicleRouter.post('/', authMiddleware, VehicleController.createVehicle)
vehicleRouter.get('/', authMiddleware, VehicleController.getAllVehicles)

export { vehicleRouter }
