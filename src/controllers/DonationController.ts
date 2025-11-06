import { Handler } from "express"
import { DonationService } from "../services/DonationService.js"
import { DonationRequestSchema } from "./schemas/DonationRequestSchema.js"
import { getUserIdFromToken } from "../utils/getUserIdFromToken.js"
import { setMessages } from "../utils/messages.js"

export class DonationController {
  private donationService = new DonationService()

  pickUpBook: Handler = async (req, res, next) => {
    try {
      const { bookId } = DonationRequestSchema.parse(req.body)
      const userId = getUserIdFromToken(req)

      this.donationService.pickUpBookService(userId, bookId)

      const messages = setMessages(
        "success",
        "Resgate realizado com sucesso",
        "Parabéns! Você acaba de resgatar um livro. Aproveite e continue espalhando conhecimento e amor pela leitura!"
      )

      res.locals.messages = messages

      res.cookie("messages", JSON.stringify(messages), {
        maxAge: 5000,
        httpOnly: true,
      })

      res.redirect("/")
    } catch (error) {
      next(error)
    }
  }
}