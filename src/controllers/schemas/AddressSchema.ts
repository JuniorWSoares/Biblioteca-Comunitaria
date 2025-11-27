import { z } from "zod"

export const AddressSchema = z.object({
  rua: z.string().optional(),
  numero: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  cep: z.string().optional(),
  complemento: z.string().optional(),
})