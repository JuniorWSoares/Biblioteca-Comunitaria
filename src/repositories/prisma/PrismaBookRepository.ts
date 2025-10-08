import { Livro } from "@prisma/client";
import { prisma } from "../../database/index.js";
import { BooksRepository, CreateBookAttributes } from "../BookRepository.js";

export class PrismaBookRepository implements BooksRepository {
    findAll(): Promise<Livro[]> {
        return prisma.livro.findMany({
            where: {
                doacao: {
                    id_receptor: null    
                }
            },
            orderBy: {titulo: 'asc'}
        })
    }

    findByName(name: string):Promise<Livro[] | null> {
        return prisma.livro.findMany({
            where: {
                doacao: {
                    id_receptor: null
                },
                titulo: {
                    contains: name,
                    mode: "insensitive"
                }
            },
            orderBy: {titulo: 'asc'}
        }) 
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