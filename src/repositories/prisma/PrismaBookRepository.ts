import { Livro } from "@prisma/client";
import { prisma } from "../../database/index.js";
import { BooksRepository, CreateBookAttributes, ReturnWithPagination } from "../BookRepository.js";

export class PrismaBookRepository implements BooksRepository {
    async findAll(skip: number, limit:number): Promise<ReturnWithPagination> {
        const books = await prisma.livro.findMany({
            where: {
                doacao: {
                    id_receptor: null    
                }
            },
            orderBy: {titulo: 'asc'},
            skip,
            take: limit
        })

        const totalBooks = await prisma.livro.count({
            where: {
                doacao: {
                    id_receptor: null
                }
            }
        })

        const totalPages = Math.ceil(totalBooks / limit)

        return {books, totalPages}
    }

    async findByName(name: string, skip: number, limit:number):Promise<ReturnWithPagination> {
        const books = await prisma.livro.findMany({
            where: {
                doacao: {
                    id_receptor: null
                },
                titulo: {
                    contains: name,
                    mode: "insensitive"
                }
            },
            orderBy: {titulo: 'asc'},
            skip,
            take: limit
        }) 

        const totalBooks = await prisma.livro.count({
            where: {
                doacao: {
                    id_receptor: null
                },
                titulo: {
                    contains: name,
                    mode: "insensitive"
                } 
            }
        })

        const totalPages = Math.ceil(totalBooks / limit)

        return {books, totalPages}
    }

    findById(id: number): Promise<Livro | null> {
        return prisma.livro.findUnique({where: {id}})
    }

    async create(attributes: CreateBookAttributes): Promise<void> {
        await prisma.livro.create({
            data: {
                titulo: attributes.title,
                autor: attributes.author,
                foto_capa: attributes.bookCover,
                sinopse: attributes.synopsis,

                doacao: {
                    create: {
                        id_doador: attributes.donorId
                    }
                }
            }
        })
    }

    delete(id: number): Promise<Livro | null> {
        return prisma.livro.delete({where: {id}})
    }
}