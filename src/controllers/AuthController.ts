import { Handler } from "express"
import { AuthService } from "../services/authService.js"
import { LoginRequestSchema, RegisterRequestSchema } from "./schemas/AuthRequestSchema.js"

export class AuthController {
    private authService = new AuthService()
    
    login: Handler = async (req, res, next) => {
        try{
            const {email, password} = LoginRequestSchema.parse(req.body)
            const token = await this.authService.login(email, password)
            res.cookie("token", token, {httpOnly: true, sameSite: "strict", maxAge: 3600 * 1000 })
            res.redirect("/")
        }catch (error){
            next(error)
        }
    }

    register: Handler = async (req, res, next) => {
        try {
            const {name, email, password, phone} = RegisterRequestSchema.parse(req.body) 
            const token = await this.authService.register(name, email, password, phone)
            res.cookie("token", token, {httpOnly: true, sameSite: "strict", maxAge: 3600 * 1000 })
            res.redirect("/")
        } catch (error) {
            next(error)  
        }
    }
}