import { Handler } from "express"
import { DonationService } from "../services/DonationService.js"
import { DonationRequestSchema } from "./schemas/DonationRequestSchema.js"
import jwt from "jsonwebtoken"

export class DonationController {
    private donationService = new DonationService()
    
    pickUpBook: Handler = async (req, res, next) => {
        try {
            const secretKey = process.env.SECRET_KEY
            if (!secretKey) throw new Error('SECRET_KEY não definida no .env')

            const token = req.cookies?.userData
            const userData = jwt.verify(token, secretKey) as { id: number, name: string}
            const userId = userData.id
            const {bookId} = DonationRequestSchema.parse(req.body) 

            this.donationService.pickUpBookService(userId, bookId)
            
            const alert = {
                title: "Resgate realizado com sucesso",
                message: `Parabéns! Você acaba de resgatar um livro. Aproveite e continue espalhando conhecimento e amor pela leitura!`
            }

            res.cookie("alert", JSON.stringify(alert), { maxAge: 5000, httpOnly: true });

            res.redirect("/")
        } catch (error) {
            next(error)   
        }
    }
}