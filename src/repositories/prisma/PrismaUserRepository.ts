import { Usuario } from "@prisma/client";
import { AddressAttributes, RegisterUserAttributes, UserAddressDTO, UsersRepository } from "../UserRepository.js"
import { prisma } from "../../database/index.js";

export class PrismaUserRepository implements UsersRepository {
    async findById(id: number): Promise<Usuario | null> {
        return await prisma.usuario.findUnique({
            where: {id}
        })
    }
    
    async findByEmail(email: string): Promise<Usuario | null> {
        return await prisma.usuario.findUnique({
            where: {email}
        })
    }

    async create(attributes: RegisterUserAttributes): Promise<Usuario> {
        return await prisma.usuario.create({
            data: {
                email: attributes.email,
                nome: attributes.name,
                telefone: attributes.phone,
                senha: attributes.password,
                papel: "voluntario"
            }
        })
    }

    async updateAddress(attributes: AddressAttributes): Promise<UserAddressDTO> {
        return await prisma.usuario.update({
            where: {id: attributes.userId},
            data: {
                rua: attributes.rua,
                numero: attributes.numero,
                bairro: attributes.bairro,
                cidade: attributes.cidade,
                estado: attributes.estado,
                cep: attributes.cep,
                complemento: attributes.complemento
            },
            select: {
                rua: !!attributes.rua,
                numero: !!attributes.numero,
                bairro: !!attributes.bairro,
                cidade: !!attributes.cidade,
                estado: !!attributes.estado,
                cep: !!attributes.cep,
                complemento: !!attributes.complemento
            }
        })
    }
}