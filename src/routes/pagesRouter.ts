import express from "express"
import { bookController, donationController } from "./container.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { upload } from "../middlewares/uploadMiddleware.js"

const router = express.Router()

//Pagina inicial
router.get("/", authMiddleware, bookController.allBooks)
//Pagina de doacao
router.get("/donate", authMiddleware, (req, res) => res.render("donation", {alert: false}))

//Pesquisar por nome livro
router.post("/search-for", authMiddleware, bookController.bookByName)
//Doar livro
router.post("/donate", authMiddleware, upload.single("bookCover"), bookController.donateBook)
//Resgatar livro
router.post("/pick-up", authMiddleware, donationController.pickUpBook)
//Deletar livro
router.delete("/delete-book", authMiddleware, bookController.deleteBook)

export default router 