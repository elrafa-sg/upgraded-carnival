import { Request, Response } from 'express'

import { mongoClient } from "../database/mongoClient"

class VehicleController {
    static async createVehicle(req: Request, res: Response) {
        try {
            const createVehicleResponse = await mongoClient.vehicle.create({
                data: {
                    plate: req.body.plate,
                    ownerId: req.body.userId
                }
            })

            res.status(201).json(createVehicleResponse)
        }
        catch (err: any) {
            res.status(500).json({ message: err.message })
        }
    }

    static async getAllVehicles(req: Request, res: Response) {
        try {
            const vehiclesList = await mongoClient.vehicle.findMany({
                where: {
                    ownerId: req.body.idUsuario
                }
            })

            res.status(201).json(vehiclesList)
        }
        catch (err: any) {
            res.status(500).json({ message: err.message })
        }
    }
}

export { VehicleController }