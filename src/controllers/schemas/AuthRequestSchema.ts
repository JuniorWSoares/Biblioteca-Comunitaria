import {z} from "zod"

export const LoginRequestSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const RegisterRequestSchema = z.object({
    name: z.string(), 
    email: z.string(), 
    password: z.string(), 
    phone: z.string().optional()
})