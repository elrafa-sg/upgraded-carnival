import jwt from 'jsonwebtoken'

const ACCESS_SECRET = process.env.ACCESS_SECRET ?? ''
const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES ?? ''

export function generateTokens(dataToEncript: any) {
    return jwt.sign(dataToEncript, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES })
}

export function verifyToken(token: string) {
    return jwt.verify(token, ACCESS_SECRET)
}