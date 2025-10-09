import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository.js"
import { validarEmail } from "../utils/validador-email.js"
import { HttpError } from "../errors/HttpError.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export class AuthService {
    private userRepository = new PrismaUserRepository()

    async login(email: string, password: string) {

        const emailIsValid = validarEmail(email)
        if(!emailIsValid) throw new HttpError(400, "O email precisa ser valido")

        const user = await this.userRepository.findByEmail(email)
        if(!user) throw new HttpError(401, "E-mail ou senha inválidos!")

        const isValid = await bcrypt.compare(password, user.senha)
        if(!isValid) throw new HttpError(401, "E-mail ou senha inválidos!")

        const secretKey = process.env.SECRET_KEY
        if (!secretKey) {
            throw new Error('Chave secreta não definida no .env');
        }

        const token = jwt.sign({email: user.email}, secretKey, {expiresIn: "1h"})
        return token
    }

    async register( name: string, email: string, password: string, phone?: string) {
        const hashedPassword = await bcrypt.hash(password, 10)

        const userExists = await this.userRepository.findByEmail(email)
        if(userExists) throw new HttpError(409, "Email ja cadastrado")

        const user = await this.userRepository.create({name, email, password: hashedPassword, phone})

        const secretKey = process.env.SECRET_KEY

        if (!secretKey) {
            throw new Error('Chave secreta não definida no .env');
        }

        const token = jwt.sign({email: user.email}, secretKey, { expiresIn: "1h" })
        return token
    }
}