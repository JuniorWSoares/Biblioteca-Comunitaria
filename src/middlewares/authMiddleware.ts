import { Handler } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"
import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository.js";
import { HttpError } from "../errors/HttpError.js";

export const authMiddleware: Handler = async (req, res, next) => {
    const autheRepository = new PrismaUserRepository()
    const token = req.cookies?.token
    const secretKey = process.env.SECRET_KEY

    if (!token) {
        res.redirect("/auth/login")
        return
    }

    if (!secretKey) throw new Error('SECRET_KEY não definida no .env')

    try {
        const decoded = jwt.verify(token, secretKey) as {email: string}
        const user = await autheRepository.findByEmail(decoded.email)
        if (!user) throw new HttpError(404, "Usuário não encontrado")
        
        const userData = {
            id: user.id,
            name: user.nome.split(" ")[0]
        }

        const tokenUser = jwt.sign(userData, secretKey, { expiresIn: '1h' });
        res.cookie("userData", tokenUser, {httpOnly: true, sameSite: "strict", maxAge: 3600 * 1000 });
        next();
    } catch(error){
        next(error)
    }
}