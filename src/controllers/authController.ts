import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

import { mongoClient } from "../database/mongoClient"
import { generateTokens } from '../helpers/auth'

class AuthController {

    static async authUser(req: Request, res: Response) {
        try {
            const user = await mongoClient.user.findFirst({
                where: {
                    email: req.body.email
                }
            })

            if (!user) {
                return res.status(400).json({ message: 'Senha ou email inválidos!' })
            }

            const passwordIsValid = await bcrypt.compare(req.body.password, user.password)
            if (passwordIsValid) {
                const { email, name } = user
                const accessToken = generateTokens(user)

                const userData = {
                    email, name, accessToken
                }

                res.status(200).json(userData)
            }
            else {
                res.status(400).json({ message: 'Senha inválida!' })
            }
        }
        catch (err: any) {
            console.log('authUser', err)
            res.status(500).json({ message: err.message })
        }
    }
}

export { AuthController }