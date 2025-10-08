import { Livro } from "@prisma/client";

export interface CreateBookAttributes{
    title: string,
    donorId: number,
    author?: string,
    bookCover?: string,
    synopsis?: string
}

export interface BooksRepository {
    findAll: () => Promise<Livro[]>
    findByName: (name: string) => Promise<Livro[] | null>
    findById: (id: number) => Promise<Livro | null>
    create: (attributes: CreateBookAttributes) => Promise<void>
    delete: (id: number) => Promise<Livro | null>
}