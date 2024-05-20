import { mongoClient } from "../database/mongoClient.js"

class UserController {
    static async createUser(req, res) {
        try {
            const createUserResponse = await mongoClient.user.create({
                data: {
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name
                }
            })

            res.status(201).json(createUserResponse)
        }
        catch (err) {
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