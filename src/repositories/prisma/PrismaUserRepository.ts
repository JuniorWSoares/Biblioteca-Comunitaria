import { Usuario } from "@prisma/client";
import { RegisterUserAttributes, UsersRepository } from "../UserRepository.js"
import { prisma } from "../../database/index.js";

export class PrismaUserRepository implements UsersRepository {
    findById(id: number): Promise<Usuario | null> {
        return prisma.usuario.findUnique({
            where: {id}
        })
    }
    
    findByEmail(email: string): Promise<Usuario | null> {
        return prisma.usuario.findUnique({
            where: {email}
        })
    }

    create(attributes: RegisterUserAttributes): Promise<Usuario> {
        return prisma.usuario.create({
            data: {
                email: attributes.email,
                nome: attributes.name,
                telefone: attributes.phone,
                senha: attributes.password,
                papel: "voluntario"
            }
        })
    }
}