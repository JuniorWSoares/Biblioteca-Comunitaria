import { RegisterBookRequestSchema} from "./schemas/BookRequestSchema.js"
import { BookService } from "../services/BookService.js"
import { Handler } from "express"
import jwt from "jsonwebtoken"

export class BookController {
    private bookService = new BookService()

    homepage: Handler = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page as string) || 1; 
            const limit = 16; 
            const skip = (page - 1) * limit;

            const result = await this.bookService.getAllBooks(skip, limit)
            const books = result.books
            const totalPages = result.totalPages

            let alert = null
            if(req.cookies.alert) alert = JSON.parse(req.cookies.alert)
            res.clearCookie("alert")

            res.render("homepage", {books, currentUrl: req.path, page, totalPages, alert, bookName: null})
        } catch (error) {
            next(error)  
        }
    }

    homepageWithSearchedBooks: Handler = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page as string) || 1; 
            const limit = 16; 
            const skip = (page - 1) * limit;
            const bookName = req.query.bookName as string
            const result = await this.bookService.getBooksByName(bookName, skip, limit)

            const books = result.books
            const totalPages = result.totalPages

            res.render("homepage", {books, currentUrl: req.path, page, totalPages, alert: null, bookName})
        } catch (error) {
            next(error)      
        }
    }

    bookById: Handler = async (req, res, next) => {
        try {
            //Implementar
        } catch (error) {
            
        }
    }

    donateBook: Handler = (req, res, next) => {
        try {
            const secretKey = process.env.SECRET_KEY
            if (!secretKey) throw new Error('SECRET_KEY não definida no .env')

            const token = req.cookies?.userData
            const userData = jwt.verify(token, secretKey) as { id: number, name: string}
            const donorId = userData.id

            const {title, author, synopsis} = RegisterBookRequestSchema.parse(req.body)
            const bookCover = `/uploads/${req.file?.filename}`
            
            const bookData = { title, donorId, author, bookCover, synopsis}
            this.bookService.registerBook(bookData)

            const alert = {
                title: "Doação realizada com sucesso",
                message: `Sua doação fortalece nossa comunidade e incentiva o amor pela leitura.
                Muito obrigado por fazer parte dessa história!`
            }

            res.render("donation", {alert})
        } catch (error) {
            next(error)    
        }
    }

    deleteBook: Handler = async (req, res, next) => {
        try {
            this.bookService.deleteBook(Number(req.params.id))
            res.render("homepage")
        } catch (error) {
            next(error)    
        }
    }
}