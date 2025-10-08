import { RegisterBookRequestSchema, searchBookByNameRequestSchema } from "./schemas/BookRequestSchema.js"
import { BookService } from "../services/BookService.js"
import { Handler } from "express"
import jwt from "jsonwebtoken"

export class BookController {
    private bookService = new BookService()

    allBooks: Handler = async (req, res, next) => {
        try {
            const books = await this.bookService.getAllBooks()
            let alert = null
            if(req.cookies.alert) { 
                alert = JSON.parse(req.cookies.alert);
            }
            res.clearCookie("alert");
            res.render("homepage", {books, currentUrl: req.originalUrl, alert})
        } catch (error) {
            next(error)  
        }
    }

    bookByName: Handler = async (req, res, next) => {
        try {
            const {bookName} = searchBookByNameRequestSchema.parse(req.body)
            const books = await this.bookService.getBookByName(bookName)
            res.render("homepage", {books, currentUrl: req.originalUrl, alert: null})
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