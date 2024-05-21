import jwt from 'jsonwebtoken'

export function generateTokens(dataToEncript) {
    return jwt.sign(dataToEncript, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_EXPIRES })
}

export function verifyToken(token) {
    return jwt.verify(token, process.env.ACCESS_SECRET)
}