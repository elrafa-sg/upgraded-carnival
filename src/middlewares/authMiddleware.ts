import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../helpers/auth'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) {
            return res.status(401).send({ message: 'O token não foi informado' })
        }

        const decoded: any = verifyToken(token)
        req.body.userId = decoded.id
        next()
    } catch (err: any) {
        return res.status(403).send('O token já expirou')
    }
}