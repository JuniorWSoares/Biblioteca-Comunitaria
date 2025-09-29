import express from "express"
import path from "node:path"
import { fileURLToPath } from "node:url"
import authRouter from "./routes/authRouter.js"

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 API com Express + Prisma + TypeScript funcionando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})