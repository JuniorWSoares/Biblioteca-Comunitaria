import { AddressController } from "../controllers/AddressController.js"
import { AuthController } from "../controllers/AuthController.js"
import { BookController } from "../controllers/BookController.js"
import { DonationController } from "../controllers/DonationController.js"

export const authController = new AuthController()
export const bookController = new BookController()
export const donationController = new DonationController()
export const addressController = new AddressController()