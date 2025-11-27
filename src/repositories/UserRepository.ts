import { Usuario } from "@prisma/client"

export interface RegisterUserAttributes {
    name: string
    email: string
    password: string
    phone?: string
}

export interface AddressAttributes{
    userId: number
    rua?: string
    numero?:string
    bairro?:string
    cidade?:string
    estado?:string
    cep?:string
    complemento?:string
}

export interface UserAddressDTO{
    rua?: string | null;
    numero?: string | null;
    bairro?: string | null;
    cidade?: string | null;
    estado?: string | null;
    cep?: string | null;
    complemento?: string | null;
}

export interface UsersRepository {
    findById: (id: number) => Promise<Usuario | null>
    findByEmail: (email: string) => Promise<Usuario | null>
    create: (attributes: RegisterUserAttributes) => Promise<Usuario>
    updateAddress: (attributes: AddressAttributes) => Promise<UserAddressDTO>
    getAddress: (userId: number) => Promise<UserAddressDTO | null>
}