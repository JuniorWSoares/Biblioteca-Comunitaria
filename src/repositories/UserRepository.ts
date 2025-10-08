import { Usuario } from "@prisma/client"

export interface RegisterUserAttributes {
    name: string
    email: string
    password: string
    phone?: string
}

export interface UsersRepository {
    findById: (id: number) => Promise<Usuario | null>
    findByEmail: (email: string) => Promise<Usuario | null>
    create: (attributes: RegisterUserAttributes) => Promise<Usuario>
}