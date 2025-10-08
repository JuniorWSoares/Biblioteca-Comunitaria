import express from "express"
import { authController } from "./container.js"

const router = express.Router()

//Rotas de paginas
router.get("/login", (req, res) => res.render("login", {alert: false}))

//Rotas de API
router.post("/register", authController.register)
router.post("/login", authController.login)

export default router