import { RegisterBookRequestSchema } from "./schemas/BookRequestSchema.js"
import { BookService } from "../services/BookService.js"
import { Handler } from "express"
import { HttpError } from "../errors/HttpError.js"
import { getUserIdFromToken } from "../utils/getUserIdFromToken.js"
import { pagination } from "../utils/pagination.js"
import {messagesByCookie, setMessages } from "../utils/messages.js"
import { generosLiterarios } from "../utils/bookGenres.js"
import z from "zod"
import { ZodError } from "zod"

export class BookController {
  private bookService = new BookService()

  //Paginas renderizadas

  homepage: Handler = async (req, res, next) => {
    try {
      const { page, limit, skip } = pagination(req, 16)
      const { books, totalPages } = await this.bookService.getAllBooks(skip, limit)

      let messages = { success: [], error: [] }
      messagesByCookie(req, res)
      
      if(res.locals.messages) messages = res.locals.messages

      res.render("homepage", {
        books,
        currentUrl: req.path,
        page,
        totalPages,
        messages,
        searchTerm: '',
        searchType: 'titulo'  
      })
    } catch (error) {
      next(error)
    }
  }

  homepageWithSearch: Handler = async (req, res, next) => {
    try {
      const { page, limit, skip } = pagination(req, 16)
      
      // Agora pegamos o termo (antigo bookName) e o tipo
      const searchTerm = (req.query.term as string) || ''
      const searchType = (req.query.type as string) || 'titulo' // Padrão: titulo

      // Chamamos o serviço passando o tipo também
      const { books, totalPages } = await this.bookService.searchBooks(
        searchTerm, 
        searchType, 
        skip, 
        limit
      )

      let messages = { success: [], error: [] }
      messagesByCookie(req, res)
      
      if (res.locals.messages) messages = res.locals.messages

      res.render("homepage", {
        books,
        currentUrl: req.path,
        page,
        totalPages,
        messages,
        searchTerm, 
        searchType  
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

      res.render("homepage", {
        books,
        currentUrl: req.path,
        page,
        totalPages,
        messages,
        searchTerm: '',
        searchType: 'titulo'  
      })
    } catch (error) {
      next(error)
    }
  }

  allReceivedBooks: Handler = async (req, res, next) => {
    try {
      const {page, limit, skip} = pagination(req, 16)
      const userId = getUserIdFromToken(req)
      const {books, totalPages} = await this.bookService.getReceivedBooks(userId, skip, limit)

      const messages = messagesByCookie(req, res)

      res.render("homepage", {
        books,
        currentUrl: req.path,
        page,
        totalPages,
        messages,
        searchTerm: '',
        searchType: 'titulo'  
      })
    } catch (error) {
      next(error)
    }
  }

  renderDonationPage: Handler = async (req, res, next) => {
    try {
      // 1. Prepara o objeto de mensagens 
      let messages = { success: [], error: [] }
      messagesByCookie(req, res)
      
      if (res.locals.messages) {
        messages = res.locals.messages
      }

      // 2. Renderiza a view enviando TUDO que ela precisa
      res.render("donation", { 
        generosLiterarios, 
        messages           
      })
    } catch (error) {
      next(error)
    }
  }

  donateBook: Handler = async (req, res, next) => {
    try {
      const donorId = getUserIdFromToken(req)
      
      // 1. Extraindo o 'genre' do corpo da requisição
      const { title, author, synopsis, genre } = RegisterBookRequestSchema.parse(req.body)
      
      const bookCover = `/uploads/${req.file?.filename}`

      // 2. Adicionando genre ao objeto de dados
      const bookData = { title, donorId, author, bookCover, synopsis, genre }
      
      const donationId = await this.bookService.registerBook(bookData)
      
      res.render("donation-success", { 
          donationId
      })

    } catch (error) {

      // Verifica se é um erro do nosso sistema (HttpError)
      if (error instanceof HttpError) {
        const messages = setMessages(
          "error", 
          "Erro ao doar!", 
          error.message
        )
        return res.render("donation", { messages, generosLiterarios })
      } 
      else if (error instanceof ZodError) {
        const primeiroErro = error.issues[0].message
        
        const messages = setMessages(
          "error", 
          "Dados inválidos", 
          primeiroErro
        )
        return res.render("donation", { messages, generosLiterarios })
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
