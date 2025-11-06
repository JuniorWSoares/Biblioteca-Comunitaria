import express from "express"
import { authController } from "./container.js"

const router = express.Router()

//Rotas de paginas
router.get("/login", (req, res) => res.render("login", {messages: { success: [], error: [] }}))

//Rotas de API
router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/logout", authController.logout)

export default router