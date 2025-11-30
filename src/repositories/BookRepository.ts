import { Livro } from "@prisma/client";

export interface ReturnWithPagination{
    books: any[],
    totalPages: number    
}

export interface CreateBookAttributes{
    title: string,
    donorId: number,
    author?: string,
    bookCover?: string,
    synopsis?: string,
    genre: string;
}

export interface BooksRepository {
    findAll: (skip: number, limit: number) => Promise<ReturnWithPagination>
    findByName: (name: string, skip: number, limit: number) => Promise<ReturnWithPagination>
    findDonatedBooks: (userId: number, skip: number, limit: number) => Promise<ReturnWithPagination>
    findReceivedBooks: (userId: number, skip: number, limit: number) => Promise<ReturnWithPagination>
    findById: (id: number) => Promise<Livro | null>
    create: (attributes: CreateBookAttributes) => Promise<number>
    delete: (id: number) => Promise<Livro | null>
}