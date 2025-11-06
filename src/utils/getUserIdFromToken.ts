
import jwt from "jsonwebtoken"
export function getUserIdFromToken(req: any): number {
    const secretKey = process.env.SECRET_KEY
    if (!secretKey) throw new Error('SECRET_KEY não definida no .env')
    const token = req.cookies?.userData
    const {id} = jwt.verify(token, secretKey) as { id: number }
    return id
}