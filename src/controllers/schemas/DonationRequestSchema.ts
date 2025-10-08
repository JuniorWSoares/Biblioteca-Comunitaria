import {z} from "zod"

export const DonationRequestSchema = z.object({
    bookId: z.coerce.number()
})
