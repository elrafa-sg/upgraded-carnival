import { verifyToken } from '../helpers/auth.js'

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) {
            return res.status(401).send({ message: 'O token não foi informado' })
        }

        const decoded = verifyToken(token)

        req.body.userId = decoded.id
        next()
    } catch (err) {

        return res.status(403).send('O token já expirou')
    }
}