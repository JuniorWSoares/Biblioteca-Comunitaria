import { prisma } from "../../database/index.js";
import { DonationsRepository } from "../DonationRepository.js";

export class PrismaDonationRepository implements DonationsRepository {
    async pickUpBook(userId: number, bookId: number): Promise<void> {
        await prisma.doacao.update({
            data: {
                data_resgate: new Date(),
                id_receptor: userId
            },
            where: {
                id_livro: bookId
            }
        })  
    }
}