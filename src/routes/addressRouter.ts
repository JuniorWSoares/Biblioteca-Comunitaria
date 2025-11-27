import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { addressController } from "./container.js"

const router = express.Router()

router.put("/address", authMiddleware, addressController.updateAddress)

export default router