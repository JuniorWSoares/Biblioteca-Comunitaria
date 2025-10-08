import {z} from "zod"

export const RegisterBookRequestSchema = z.object({
    title: z.string(),
    author: z.string().optional(),
    synopsis: z.string().optional()
})

export const searchBookByNameRequestSchema = z.object({
    bookName: z.string()
})