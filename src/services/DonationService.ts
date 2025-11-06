import { HttpError } from "../errors/HttpError.js"
import { PrismaBookRepository } from "../repositories/prisma/PrismaBookRepository.js"
import { PrismaDonationRepository } from "../repositories/prisma/PrismaDonationRepository.js"
import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository.js"

export class DonationService {
    private bookRepository = new PrismaBookRepository()
    private userRepository = new PrismaUserRepository()
    private donationRepository = new PrismaDonationRepository()

    async pickUpBookService(userId: number, bookId: number) {
        const user = await this.userRepository.findById(userId)  
        if(!user) throw new HttpError(404, "Usuario nao encontrado")  

        const book = await this.bookRepository.findById(bookId)
        if(!book) throw new HttpError(404, "Livro nao encontrado")

        await this.donationRepository.pickUpBook(user.id, book.id)
    }
}