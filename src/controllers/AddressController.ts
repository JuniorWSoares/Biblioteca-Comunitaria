import { Handler } from "express";
import { AddressService } from "../services/AddressService.js";
import { AddressSchema } from "./schemas/AddressSchema.js";
import { getUserIdFromToken } from "../utils/getUserIdFromToken.js";

export class AddressController {
    private addressService = new AddressService()

    updateAddress: Handler = async (req, res, next) => {
        try {
            const userId = getUserIdFromToken(req)
            const address = AddressSchema.parse(req.body)
            const data = {...address, userId}
            const updatedAddress = await this.addressService.updateAddress(data)
            return res.status(200).json(updatedAddress)
        } catch (error: any) {
            return res.status(400).json({ error: error.message })
        }
    }

    getAddress: Handler = async (req, res, next) => {
        try {
            const userId = getUserIdFromToken(req)
            const address = await this.addressService.getAddress(userId)
            return res.status(200).json(address)
        } catch (error: any) {
            return res.status(400).json({ error: error.message })
        }
    }
}