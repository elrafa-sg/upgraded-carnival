import express from 'express'

import { authMiddleware } from '../middlewares/authMiddleware'
import { VehicleController } from '../controllers/vehicleController'
import { createVehicleMiddleware } from '../middlewares/createVehicleMiddleware'

const vehicleRouter = express.Router()

vehicleRouter.post('/', createVehicleMiddleware, authMiddleware, VehicleController.createVehicle
    /* 
            #swagger.parameters['body'] = {
                in: 'body',
                schema: {
                    $plate: ''
                }
            }
    */
)
vehicleRouter.get('/', authMiddleware, VehicleController.getAllVehicles)

export { vehicleRouter }
