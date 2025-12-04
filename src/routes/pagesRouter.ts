import express from "express"
import { bookController, donationController } from "./container.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { upload } from "../middlewares/uploadMiddleware.js"

const router = express.Router()

//Pagina inicial
router.get("/", authMiddleware, bookController.homepage)
//Pagina de doacao
router.get("/donate", authMiddleware, bookController.renderDonationPage)
//Pesquisar por nome livro
router.get("/search-for", authMiddleware, bookController.homepageWithSearch)
//Buscar livros doados
router.get("/donatedBooks", authMiddleware, bookController.allDonatedBooks)
//Buscar livros recebidos
router.get("/receivedBooks", authMiddleware, bookController.allReceivedBooks)

//Pagina com todos os livros doados
router.get("/livros-doados", authMiddleware, bookController.allDonatedBooks)
router.get("/livros-resgatados", authMiddleware, bookController.allReceivedBooks)

//Doar livro
router.post("/donate", authMiddleware, upload.single("bookCover"), bookController.donateBook)
//Resgatar livro
router.post("/pick-up", authMiddleware, donationController.pickUpBook)
//Deletar livro
router.delete("/delete-book", authMiddleware, bookController.deleteBook)

export default router 