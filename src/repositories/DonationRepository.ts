import { Doacao } from "@prisma/client";

export interface DonationsRepository {
    pickUpBook: (userId: number, bookId: number) => Promise<void>
}