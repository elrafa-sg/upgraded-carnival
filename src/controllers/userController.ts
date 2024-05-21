import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

import { mongoClient } from "../database/mongoClient"

class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const createUserResponse = await mongoClient.user.create({
                data: {
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    name: req.body.name
                }
            })

            res.status(201).json(createUserResponse)
        }
        catch (err: any) {
            if (err?.meta?.target === 'User_email_key') {
                res.status(403).json({ message: 'Email já cadastrado!' })
            }
            else {
                res.status(500).json({ message: 'Ocorreu um erro interno e sua requisição não pôde ser processada. Tente novamente mais tarde!' })
            }
        }
    }
}

export { UserController }