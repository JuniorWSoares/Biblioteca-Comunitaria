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

    async search(term: string, type: string, skip: number, limit: number): Promise<ReturnWithPagination> {
    
        // 1. Base da query: Livros disponíveis para doação (id_receptor nulo)
        let whereClause: any = {
            doacao: {
                id_receptor: null
            }
        }

        // 2. Filtro Dinâmico baseado na String
        if (term) {
            switch (type) {
                case 'autor':
                    // Busca direta na coluna 'autor' (String)
                    whereClause.autor = { contains: term, mode: "insensitive" };
                    break

                case 'genero':
                    // Busca direta na coluna 'genero' (String)
                    whereClause.genero = { contains: term, mode: "insensitive" };
                    break

                case 'titulo':
                default:
                    // Busca direta na coluna 'titulo' (String)
                    whereClause.titulo = { contains: term, mode: "insensitive" };
                    break
            }
        }

        // 3. Execução da Query
        const [books, totalBooks] = await prisma.$transaction([
            prisma.livro.findMany({
                where: whereClause,
                orderBy: { titulo: 'asc' },
                skip,
                take: limit
            }),
            prisma.livro.count({
                where: whereClause
            })
        ])

        const totalPages = Math.ceil(totalBooks / limit)

        return { books, totalPages }
    }

    async findDonatedBooks(userId: number, skip: number, limit: number): Promise<ReturnWithPagination> {
        const books = await prisma.livro.findMany({
            where: {
                doacao: {
                    id_doador: userId
                }
            },
            orderBy: {titulo: 'asc'},
            skip,
            take: limit
        })

        const totalBooks = await prisma.livro.count({
            where: {
                doacao: {
                    id_doador: userId
                }
            }    
        })

        const totalPages = Math.ceil(totalBooks / limit)
        return {books, totalPages}
    }

    async findReceivedBooks(userId: number, skip: number, limit: number): Promise<ReturnWithPagination> {
        const books = await prisma.livro.findMany({
            where: {
                doacao: {
                    id_receptor: userId
                }
            },
            orderBy: {titulo: 'asc'},
            skip,
            take: limit
        })

        const totalBooks = await prisma.livro.count({
            where: {
                doacao: {
                    id_receptor: userId
                }
            }    
        })

        const totalPages = Math.ceil(totalBooks / limit)
        return {books, totalPages}
    }

    findById(id: number): Promise<Livro | null> {
        return prisma.livro.findUnique({where: {id}})
    }

    async create(attributes: CreateBookAttributes): Promise<number> { 
        const novoLivro = await prisma.livro.create({
            data: {
                titulo: attributes.title,
                autor: attributes.author,
                foto_capa: attributes.bookCover,
                sinopse: attributes.synopsis,
                genero: attributes.genre,

                doacao: {
                    create: {
                        id_doador: attributes.donorId
                    }
                }
            },
            include: {
                doacao: true 
            }
        })

        if (!novoLivro.doacao) {
            throw new Error("Erro ao recuperar ID da doação.")
        }

        return novoLivro.doacao.id;
    }

    delete(id: number): Promise<Livro | null> {
        return prisma.livro.delete({where: {id}})
    }
}