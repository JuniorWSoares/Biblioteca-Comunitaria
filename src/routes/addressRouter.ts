import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { addressController } from "./container.js"

const router = express.Router()

router.get("/address", authMiddleware, addressController.getAddress)
router.put("/address", authMiddleware, addressController.updateAddress)

export default router