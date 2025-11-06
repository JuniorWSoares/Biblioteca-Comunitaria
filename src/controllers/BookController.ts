import { RegisterBookRequestSchema } from "./schemas/BookRequestSchema.js"
import { BookService } from "../services/BookService.js"
import { Handler } from "express"
import { HttpError } from "../errors/HttpError.js"
import { getUserIdFromToken } from "../utils/getUserIdFromToken.js"
import { pagination } from "../utils/pagination.js"
import {messagesByCookie, setMessages } from "../utils/messages.js"

export class BookController {
  private bookService = new BookService()

  //Paginas renderizadas

  homepage: Handler = async (req, res, next) => {
    try {
      const {page, limit, skip} = pagination(req, 16)
      const {books, totalPages} = await this.bookService.getAllBooks(skip, limit)

      let messages = {success: [], error: []}
      messagesByCookie(req, res)
      
      if(res.locals.messages) messages = res.locals.messages

      res.render("homepage", {
        books,
        currentUrl: req.path,
        page,
        totalPages,
        messages,
        bookName: null
      })
    } catch (error) {
      next(error)
    }
  }

  homepageWithSearch: Handler = async (req, res, next) => {
    try {
      const {page, limit, skip} = pagination(req, 16)
      const bookName = req.query.bookName as string
      const {books, totalPages} = await this.bookService.getBooksByName(bookName, skip, limit)

      let messages = {success: [], error: []}
      messagesByCookie(req, res)
      
      if(res.locals.messages) messages = res.locals.messages

      res.render("homepage", {
        books,
        currentUrl: req.path,
        page,
        totalPages,
        messages,
        bookName
      })
    } catch (error) {
      next(error)
    }
  }

  allDonatedBooks: Handler = async (req, res, next) => {
    try {
      const {page, limit, skip} = pagination(req, 16)
      const userId = getUserIdFromToken(req)
      const {books, totalPages} = await this.bookService.getDonatedBooks(userId, skip, limit)

      const messages = messagesByCookie(req, res)

      // res.render("homepage", {books, currentUrl: req.path, page, totalPages, alert, bookName: null})
      res.json({
        books,
        currentUrl: req.path,
        page,
        totalPages,
        messages,
        bookName: null,
      })
    } catch (error) {
      next(error)
    }
  }

  bookById: Handler = async (req, res, next) => {
    try {
      //Implementar
    } catch (error) {}
  }

  donateBook: Handler = async (req, res, next) => {
    try {
      const donorId = getUserIdFromToken(req)
      const { title, author, synopsis } = RegisterBookRequestSchema.parse(req.body)
      const bookCover = `/uploads/${req.file?.filename}`

      const bookData = { title, donorId, author, bookCover, synopsis }
      await this.bookService.registerBook(bookData)

      const messages = setMessages(
        "success", 
        "Doação realizada!", 
        "Sua doação fortalece nossa comunidade e incentiva o amor pela leitura."
      )

      res.render("donation", { messages })
    } catch (error) {

      if (error instanceof HttpError) {
        const messages = setMessages(
          "error", 
          "Erro ao doar!", 
          error.message
        )
        return res.render("donation", { messages })
      }
      return next(error)
    }
  }

  deleteBook: Handler = async (req, res, next) => {
    try {
      this.bookService.deleteBook(Number(req.params.id))
      this.homepage(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
