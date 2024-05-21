import { mongoClient } from "../database/mongoClient.js"

class VehicleController {
    static async createVehicle(req, res) {
        try {
            const createVehicleResponse = await mongoClient.vehicle.create({
                data: {
                    plate: req.body.plate,
                    ownerId: req.body.userId
                }
            })

            res.status(201).json(createVehicleResponse)
        }
        catch (err) {
            console.log('createVehicle', err)
            res.status(500).json({ message: err.message })
        }
    }

    static async getAllVehicles(req, res) {
        try {
            const vehiclesList = await mongoClient.vehicle.findMany({
                where: {
                    ownerId: req.body.idUsuario
                }
            })

            res.status(201).json(vehiclesList)
        }
        catch (err) {
            console.log('getAllVehicles', err)
            res.status(500).json({ message: err.message })
        }
    }
}

export { VehicleController }