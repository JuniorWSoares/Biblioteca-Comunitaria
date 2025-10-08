import { HttpError } from "../errors/HttpError.js";
import { CreateBookAttributes } from "../repositories/BookRepository.js";
import { PrismaBookRepository } from "../repositories/prisma/PrismaBookRepository.js";
import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository.js";

export class BookService  {
    private bookRepository = new PrismaBookRepository()
    private userRepository = new PrismaUserRepository()

    getAllBooks() {
        return this.bookRepository.findAll()
    }

    getBookByName(name: string) {
       return this.bookRepository.findByName(name)
    }

    getBookById(id: number) {
        const book = this.bookRepository.findById(id)
        if(!book) throw new HttpError(404, "Livro nao encontrado")
        return book
    }

    async registerBook(params: CreateBookAttributes) {
        const user = await this.userRepository.findById(params.donorId)  
        if(!user) throw new HttpError(404, "Usuario nao encontrado")   
        return this.bookRepository.create(params)
    }

    async deleteBook(id: number) {
        const book = await this.bookRepository.delete(id)
        if(!book) throw new HttpError(404, "Livro nao encontrado")
        return book
    }
}