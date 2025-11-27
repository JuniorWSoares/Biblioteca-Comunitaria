import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository.js";
import { AddressAttributes, UserAddressDTO } from "../repositories/UserRepository.js";
import { HttpError } from "../errors/HttpError.js";

export class AddressService {
    private userRepository = new PrismaUserRepository()

    async updateAddress(params: AddressAttributes): Promise<UserAddressDTO> {
    
        const user = await this.userRepository.findById(params.userId)
        if (!user)  throw new HttpError(404, "Usuário não encontrado.")

        return await this.userRepository.updateAddress(params)
    }
}